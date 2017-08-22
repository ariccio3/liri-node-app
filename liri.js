var twitter = require("twitter");
var twitKeys = require("./keys.js");
var twit = new twitter(twitKeys);

var spotify = require("node-spotify-api");
var spotKeys = require("./spotify.js");
var spot = new spotify(spotKeys);

var omdb = require("omdb");
var request = require("request");
var omdbKey = require("./omdbKey.js");

var fs = require("fs");

var nodeArgs = process.argv;

//Twitter node liri.js my-tweets
if (nodeArgs[2] === 'my-tweets'){
	var params = {screen_name: '@ar3works', count: 20};
	twit.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < 20; i++) {
  				console.log();
    			console.log(tweets[i].text);
    			console.log(tweets[i].created_at);
  			} 
		}
	});

// Spotify  node liri.js spotify-this-song sorry
} else if (nodeArgs[2] === 'spotify-this-song') {
	var songName = "";
	for (var i = 3; i < nodeArgs.length; i++) {
		songName = songName + " " + nodeArgs[i];
	} 
	if(!songName) {
		songName = "The Sign Ace of Base";
	}
	spot.search({ type: 'track', query: songName }, function(err, data) {
    	if (!err) {
    		var objArray = data.tracks.items;
    		for (var i = 0; i < objArray.length; i++) {
	    		console.log();
				console.log('• Artist(s): ' + objArray[i].artists[0].name);
				console.log('• Song: ' + objArray[i].name);
				console.log('• Preview: ' + objArray[i].external_urls.spotify);
				console.log('• Album: ' + objArray[i].album.name);
				}
			}
		});

// OMDB node liri.js movie-this pelada
} else if (nodeArgs[2] === 'movie-this'){

	var movieName = "";
	var movieNameTrim = "Mr+Nobody";
	
		for (var i = 3; i < nodeArgs.length; i++) {
			movieName = movieName + " " + nodeArgs[i];
			movieNameTrim = movieName.trim();
		}
		
	request('http://www.omdbapi.com/?apikey=' + omdbKey + '&type=movie&t=' + movieNameTrim, function(error, response, body) {
		if (!error) {
			console.log(JSON.parse(body).Title);
			console.log(JSON.parse(body).Year);
			console.log(JSON.parse(body).imdbRating + " imdb Rating");

			var ratings = JSON.parse(body).Ratings
			for (var i = 0; i < ratings.length; i++) {
				if (ratings[i].Source == "Rotten Tomatoes") {
					console.log(JSON.parse(body).Ratings[i].Value + " Rotten Tomatoes Rating");
				}
			};

			console.log(JSON.parse(body).Country);
			console.log(JSON.parse(body).Language);
			console.log(JSON.parse(body).Plot);
			console.log(JSON.parse(body).Actors);
		} 
		
	});

// node liri.js do-what-it-says
} else if (nodeArgs[2] === 'do-what-it-says'){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			console.log(error);
		}
		var songName = data;
spot.search({ type: 'track', query: songName }, function(err, data) {
    	if (!err) {
    		var objArray = data.tracks.items;
    		for (var i = 0; i < objArray.length; i++) {
	    		console.log();
				console.log('• Artist(s): ' + objArray[i].artists[0].name);
				console.log('• Song: ' + objArray[i].name);
				console.log('• Preview: ' + objArray[i].external_urls.spotify);
				console.log('• Album: ' + objArray[i].album.name);
				}
			}
		});
	});	


}



