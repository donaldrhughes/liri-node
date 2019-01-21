var axios = require("axios");
var fs = require("fs");
// var liri = require("./liri");


var movie = function (input) {
    //OMDb API: 
    var divider = "\n----------------------\n";
    var apiOmdb = "709af4a7";
    var omdbTitle = "&t=";
    var URL = "http://www.omdbapi.com/?&apikey=" + apiOmdb + omdbTitle + input;

    axios.get(URL)
        .then(function (resp) {

            var movieData = resp.data;
            console.log("\n\n------Begin Movie------");
            var movieInfo = [
                "Movie: " + movieData.Title,
                "Year: " + movieData.Year,
                "Genre(s): " + movieData.Genre,
                "Rating: " + movieData.Rated,
                "Actors: " + movieData.Actors,
                "Summary: " + movieData.Plot,
                "imdb Rating: " + movieData.imdbRating,
                "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value,
                "Metacritic: " + movieData.Ratings[2].Value,
                "Language: " + movieData.Language,
                "Network: " + movieData.Production,
                "Website: " + movieData.Website,
                "Your input was: " + input
                
            ].join("\n\n");
            
            //outputs Movie info to a readable format on log.txt
            fs.appendFile("log.txt", movieInfo + divider, function (err) {
                if (err) throw err;

            })

           //Main Output to user
            console.log(movieInfo);
            
        })
        .catch(function (err) {
            console.log(err);
        })
};
module.exports = movie;

