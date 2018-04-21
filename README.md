# Liri-Node-App

## Overview
Created a Node.js application run in the command line called "Liri Bot", which takes in parameters and returns data based on one of four commands:

  * `View My Tweets`

  * `Find Song on Spotify`

  * `Get Movie Information`

  * `Do What the File Says`

## GIF Preview

**Link to Preview GIF** [https://drive.google.com/file/d/1ZOThWp9EdepxjbR_1zO2qO2SfniNTpUR/view] 

## Getting Started
To View this App on your own computer, first do the following: 
- Clone this repo onto your computer
- Run command 'npm install' in Terminal or GitBash
- Run command 'node liri.js' or one of the commands below.

## What Each Command Does

1. `View My Tweets`

  * Displays my last 20 tweets and when they were created

2. `Find Song on Spotify`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    * "The Sign" by Ace of Base

3. `Get Movie Information`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `Do What the File Says`

  * Takes the text from random.txt and runs the song through the Find Song on Spotify command

## Node Packages Used
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request
- Colors NPM Package - https://www.npmjs.com/package/colors
- Inquire NPM Package - https://www.npmjs.com/package/inquirer

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```

## Built With

* Visual Studio Code

## Authors

* **Jessica Giampietro** - *Node JS* - [Jessica Giampietro](https://github.com/giampietrojess)