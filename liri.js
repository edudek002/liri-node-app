require("dotenv").config(); //from dotenv requirements

var keys = require("./keys.js");

var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require("fs");

var userInput1 = process.argv[2];

var userInput2 = process.argv[3];

var text="";


switch(userInput1){

	case "my-tweets":
	console.log("Your recent tweets");
	getTweets();
	break;

	case "spotify-this-song":
	console.log("Your Spotify results");
	getSpotify();
	break;

	case "movie-this":
	console.log("Your movie");
	getMovie();
	break;

	case "do-what-it-says":
	console.log("You said ...");
	getText();
	break;

};


//TWITTER EXAMPLE

function getTweets(){
	
	//console.log(keys);
	var client = new Twitter(keys.twitter);
	//console.log(tweets

	var params = {screen_name: 'gwc_ala',count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (i=0; i<tweets.length; i++)
	  	{
	  	var tweetsText = ("#" + (i+1) + " tweet: " + tweets[i].text )	
	  	}

	    console.log(tweetsText);
	  }
	});
}



function getSpotify(){

	
	var spotify = new Spotify(keys.spotify);

	var newSong;

	if(userInput2 === undefined){
		newSong='The Sign';
		console.log(newSong);
	}

	else {
		newSong = userInput2;
		console.log(newSong);
	}
	 
	spotify.search({ type: 'track', query: newSong}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log('No Error occurred');
	console.log(data.tracks.items[0].artists[0].name);
	//console.log("Artist: " + data.tracks.items[0].artist[0].name); 
	console.log("The song's name: " + data.tracks.items[0].name); 
	console.log("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url); 
	console.log("The album that the song is from: " + data.tracks.items[0].album.name);  
	});

}





function getMovie(){

	var newMovie;

	if(userInput2 === undefined){
		newMovie='Mr Nobody';
	}

	else {
		newMovie = userInput2;
	}


	var newmovie = process.argv[2];

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + newMovie + "&y=&plot=short&apikey=trilogy";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("Release Year: " + JSON.parse(body).Year);
	  	console.log("Title: " + JSON.parse(body).Title);
	  	console.log("IMDB rating: " + JSON.parse(body).imdbRating);
	  	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoerating);
	  	console.log("Country produced: " + JSON.parse(body).Country);
	  	console.log("Language of the movie: " + JSON.parse(body).Language);
	  	console.log("Plot: " + JSON.parse(body).Plot);
	  	console.log("Actors: " + JSON.parse(body).Actors);
	  }
	});

}

function getText(){


	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log(data);

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  console.log(dataArr);
	  console.log("Check this song: " + dataArr[1]);

	  newSong = dataArr[1];

	  text = newSong;

	  writeText();


	});

}

function writeText() {

	fs.writeFile("log.txt", text, function(err) {

	  // If the code experiences any errors it will log the error to the console.
	  if (err) {
	    return console.log(err);
	  }

	  // Otherwise, it will print: "movies.txt was updated!"
	  console.log("log.txt was updated!");

	});

}








	

