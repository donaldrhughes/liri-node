//Liri v.02
//usage: 
//(example) node liri.js spotifySong <song> -- Displays Song (Spotify)
//(example) node liri.js spotifyAlbum <album> -- Displays Album (Spotify)
//(example) node liri.js omdbMovie <movie> -- Displays Movie (OMDB)


//Main Require
//=====================
require("dotenv").config();
require("./spotify")
var keys = require("./keys");
var movie = require("./movie");
var Spotify = require('node-spotify-api');
var fs = require("fs");


//Main
//======================

// main user input
var input = process.argv[3];
var command = process.argv[2];

//add node args in input var
for (i = 4; i < process.argv.length; i++) {
    input += " " + process.argv[i];
}
//main liri function
mainLiri();


//Functions
//===========================
//main liri function
function mainLiri() {
    var dataObj = {
        command: command,
        input: input
    };
    //appends the command to the file system
    fs.appendFile('random.txt', command, function (err) {
        if (err) throw err;
        //reads random.txt for the command
        fs.readFile("random.txt", "utf8", (err, data) => {
            if (err) throw err;
            //sets the users command to a data object
            dataObj.command = data;
            //removes the contents of random.txt
            fs.truncate('random.txt', 0, function () { });

        });
    })

    //Command Definitions
    //Receive info on a song through Spotify
    if (dataObj.command === "spotifySong" && process.argv[3] !== undefined) {

        spType = 'track';
        spotifySong(spType, input);
    }
    // default track in no input rcvd
    else if (dataObj.command === "spotifySong" && process.argv[3] == undefined) {
        spType = 'track';
        input = "Ride The Lightning";
        spotifySong(spType, input);
    }
    //Receive info on a Album through Spotify
    else if (dataObj.command === "spotifyAlbum" && process.argv[3] !== undefined) {
        spType = 'album';
        spotifyAlbum(spType, input);
    }
    // default album in no input rcvd
    else if (dataObj.command === "spotifyAlbum" && process.argv[3] == undefined) {
        spType = 'album';
        input = "The Endless River";
        spotifyAlbum(spType, input, dataObj);
    }

    else if (dataObj.command === "omdbMovie" && process.argv[3] !== undefined) {

        movie(input);
    }
    else if (dataObj.command === "omdbMovie" && process.argv[3] == undefined) {
        input = "Mr. Nobody"
        movie(input);
    }

    else {
        console.log("the last else")

    };

}

//-Spotify
//show info about the song / album
function spotifySong() {
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: spType, query: input, limit: 1 })
        .then(function (response) {
            console.log("---------Begin Song------------");
            console.log("\nSong: " + response.tracks.items[0].album.name);
            console.log("\nArtist: " + response.tracks.items[0].album.artists[0].name);
            console.log("\nAlbum: " + response.tracks.items[0].album.name);
            console.log("\nPreview URL: " + response.tracks.items[0].preview_url);
            console.log("\nYour input was: " + input);
            console.log("-------------------------------");

        })
        .catch(function (err) {
            console.log(err);
        })
}

// this is Cool and Extra --
// output type Spotify Albums
function spotifyAlbum(dataObj) {
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: spType, query: input, limit: 1 })
        .then(function (response) {
            console.log("---------Begin Album------------");
            console.log("\nAlbum: " + response.albums.items[0].name);
            console.log("\nArtist: " + response.albums.items[0].artists[0].name);
            console.log("\nRelease Date: " + response.albums.items[0].release_date);
            console.log("\nImage: " + response.albums.items[0].images[0].url);
            console.log("\nYour input was: " + input);
            console.log("-------------------------------");

        })
        .catch(function (err) {
            console.log(err);
        })
}

