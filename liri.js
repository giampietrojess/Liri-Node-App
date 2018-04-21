require('dotenv').config()

// NPM Packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var inquirer = require('inquirer');
var colors = require('colors');


var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// Grabs tweets from my newly created Twitter account
    function grabMyTweets() {
        // This is the data I want
        var params = {screen_name: 'JessGiamp', count: 20};
    
        client.get('statuses/user_timeline', params, function(err, tweets, response) {
            // Log any errors
            if (err) {
            console.log('Error occurred: ' + err);
            return;
        // If the request doesn't have an error
        } else if (!err) {
            // Log the tweets and created time to console
              tweets.forEach(function(tweet) {
                  console.log('Tweet: '.blue + tweet.text + ' --Created at: '.magenta + tweet.created_at.green + '\n');
              });
          }
        });
    }


// Function for searching spotify
function searchSpotify(song) {
	spotify.search({type: 'track', query: song.search}, function(err, data) {
			// Log any errors
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    // get data
	    } else {
	    	// set tracks to the appropriate JSON property
		    var track = data.tracks.items[0];

		    // Log data to the console
		    var logSpotify = 'Artist: '.cyan.bold + track.artists[0].name +
		    	'\nSong name: '.blue.bold + track.name +
		    	'\nA preview link: '.cyan.bold + track.preview_url +
		    	'\nThe album title: '.blue.bold + track.album.name;

		    console.log(logSpotify);
		}
	});
}

// Function for searching OMDB
function searchOMDB(movie) {
	// Set searchReady to movie with spaces replaced to +'s
	var searchReady = movie.search.replace(/ /g,'+');
	// Then run a request to the OMDB API with the movie specified
	request('http://www.omdbapi.com/?apikey=trilogy&t=' + searchReady + '&y=&plot=full&tomatoes=true&r=json', function(err, response, body) {
		// Log any errors
		if (err) {
        console.log('Error occurred: ' + err);
        return;
    // If the request is successful
    } else if (!err && response.statusCode === 200) {

	    // Logs the requested data to console
	    var logOMDB = 'Title of the movie: '.blue.bold + JSON.parse(body).Title +
		    '\nYear the movie came out: '.green.bold + JSON.parse(body).Year +
		    '\nIMDB Rating of the movie: '.blue.bold + JSON.parse(body).imdbRating +
		    '\nCountry where the movie was produced: '.green.bold + JSON.parse(body).Country +
		    '\nLanguage of the movie: '.blue.bold + JSON.parse(body).Language +
		    '\nPlot of the movie: '.green.bold + JSON.parse(body).Plot +
		    '\nActors in the movie: '.blue.bold + JSON.parse(body).Actors +
		    '\nRotten Tomatoes Rating: '.green.bold + JSON.parse(body).tomatoRating +
		    '\nRotten Tomatoes URL: '.blue.bold + JSON.parse(body).tomatoURL;

		  console.log(logOMDB);
	  }
	});
}



// This makes LIRI function
function liriBrains(user) {
    //takes user input
	if (user.technology === 'spotify-this-song') {
        //and calls the corresponding function
		searchSpotify(user);

	} else if (user.technology === 'movie-this') {
		searchOMDB(user);

	} else if (user.technology === 'my-tweets') {
		grabMyTweets();

	} else {
		// If no other options were chosem, LIRI takes a command pre-written in random.txt
		fs.readFile('./random.txt', 'utf8', function(err, data) {
			// Log any errors to the console
			if (err) {
				console.log(err);
			} else {
			  // Break the string down by comma separation and store the contents into the output array.
			  var output = data.split(',');

			  // set the user keys of importance to the piece in the array
			  user.technology = output[0];
			  user.search = output[1];

			  // Recursively summon the brains
			  liriBrains(user);
			}
		});
	}

	// Log searches to log.txt
	var logTxt = 'A user entered: ' + user.technology + ' ' + user.search + '\n';

  fs.appendFile('log.txt', logTxt, function(err){
	if (err) {console.log(err)}
	});
}

// The Inquire function to prompt LIRI
inquirer.prompt([
	{
		type: 'list',
		message: "Hello, I am LIRI. How can I assist you today?",
		choices: [  
            { name: 'View my tweets', value: 'my-tweets' },
            { name: 'Find song on Spotify', value: 'spotify-this-song' },
            { name: 'Get movie Information', value: 'movie-this' },
            { name: 'Do What the File Says', value: 'do-what-it-says' }    ],

		name: 'technology'
	},
	// Only displays if spotify was selected
	{
		type: 'input',
		message: 'Which song would you like me to search?',
		name: 'search',
		default: 'The Sign Ace of Base',
		when: function(answers){
	    return answers.technology === 'spotify-this-song';
	  }
	},
	// Only displays if OMDB was selected
	{
		type: 'input',
		message: 'Which movie would you like me to search?',
		name: 'search',
		default: 'Mr. Nobody',
		when: function(answers){
	    return answers.technology === 'movie-this';
	  }
	},
	// Asks for confirmation 
	{
		type: 'confirm',
		message: 'Are you sure:',
		name: 'confirm',
		default: true

	}
]).then(function (user) {
	// If the user confirms, this happens next
	if (user.confirm){
		// Call the brains
		liriBrains(user);

		// Log pre-text while waiting on data to load
		console.log('');
		console.log('');
		console.log('Okay, let me work on that for you!');
		console.log('...');
		console.log('...');
		console.log('...');
		console.log('');
        console.log('Here you go!');
        console.log('');
		console.log('------------------------------------');
		console.log('');

	}
	// Otherwise, if the user says no 
	else {
		// This message is logged
		console.log('');
		console.log('');
		console.log('Okay! I\'ll be here if you need me!');
		console.log('');
		console.log('');
	}
// Catches any other errors logs it
}).catch(function(e) {
	console.log(e);
});