//Liri v.01


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
var spotify = new Spotify(keys.spotify);
var input = process.argv[3];
var command = process.argv[2];


//add node args in input var
for (i = 4; i < process.argv.length; i++) {
    input += " " + process.argv[i];
}

//use random.txt to call LIRI's commands.
//run spotify-this-song for "I Want it That Way," 
//as follows the text in random.txt.
//Edit text in random.txt to test out feature 
//movie-this and my-tweets

fs.appendFile('random.txt', command, function (err) {
    if (err) throw err;

})

//reads random.txt for command
var data = fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    //removes the contents of random.txt
    fs.truncate('random.txt', 0, function () {});
});


//Command Definitions
//

//Receive info on a song through Spotify
if (process.argv[2] === "spotifySong" && process.argv[3] !== undefined) {

    spType = 'track';
    spotifySong(spType, input);
}
// default track in no input rcvd
else if (process.argv[2] === "spotifySong" && process.argv[3] == undefined) {
    spType = 'track';
    input = "Ride The Lightning";
    spotifySong(spType, input);
}
//Receive info on a Album through Spotify
else if (process.argv[2] === "spotifyAlbum" && process.argv[3] !== undefined) {
    spType = 'album';
    spotifyAlbum(spType, input);
}
// default album in no input rcvd
else if (process.argv[2] === "spotifyAlbum" && process.argv[3] == undefined) {
    spType = 'album';
    input = "The Endless River";
    spotifyAlbum(spType, input);
}

else if (process.argv[2] === "omdbMovie" && process.argv[3] !== undefined) {

    movie(input);
}
else if (process.argv[2] === "omdbMovie" && process.argv[3] == undefined) {
    input = "Mr. Nobody"
    movie(input);
}

else {
    console.log("the last else")

};



//Functions
//===========================

//-Spotify
//show info about the song 
//artist |song name |preview link of song|  album of song
function spotifySong() {
    spotify
        .search({ type: spType, query: input, limit: 1 })
        .then(function (response) {
            console.log("---------Begin Song------------");
            console.log("\nSong: " + response.tracks.items[0].album.name);
            console.log("\nArtist: " + response.tracks.items[0].album.artists[0].name);
            console.log("\nAlbum: " + response.tracks.items[0].album.name);
            console.log("\nPreview URL: " + response.tracks.items[0].preview_url);
            console.log("-------------------------------");

        })
        .catch(function (err) {
            console.log(err);
        })
}

// this is Cool and Extra --
// output type album
function spotifyAlbum() {
    spotify
        .search({ type: spType, query: input, limit: 1 })
        .then(function (response) {
            console.log("---------Begin Album------------");
            console.log(response.albums.items[0])
            console.log("\nAlbum: " + response.albums.items[0].name);
            console.log("\nArtist: " + response.albums.items[0].artists[0].name);
            console.log("\nRelease Date: " + response.albums.items[0].release_date);
            console.log("\nImage: " + response.albums.items[0].images[0].url);
            console.log("-------------------------------");

        })
        .catch(function (err) {
            console.log(err);
        })
}
