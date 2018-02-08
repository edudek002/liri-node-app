require("dotenv").config(); //from dotenv requirements

var keys = require("./keys.js");

var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require("fs");

var userInput1 = process.argv[2];

var userInput2 = process.argv[3];

var userInput3 = process.argv[4];

var userInput4 = process.argv[5];



var tweetsText=[];

var text="";


switch(userInput1){

	case "my-tweets":
	console.log("\n" + "MY RECENT TWEETS ARE: ");
	console.log("====================");
	getTweets();
	break;

	case "spotify-this-song":
	console.log("\n" + "MY SPOTIFY RESULTS: ");
	console.log("====================");
	getSpotify();
	break;

	case "movie-this":
	console.log("\n" + "MY MOVIE RESULTS: ");
	console.log("====================");
	getMovie();
	break;

	case "do-what-it-says":
	console.log("You said ...");
	console.log("====================");
	getText();
	break;

};


//Function to print information from the TWITTER 

function getTweets(){
	
	//getting Twitter keys from keys.js (that reads .env)
	var client = new Twitter(keys.twitter);
	
	//getting information from the TWITTER

	var params = {screen_name: 'gwc_ala',count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (i=0; i<tweets.length; i++)
	  	{
	  	tweetsText[i] = ("\n" + "#" + (tweets.length-i) + " tweet: " + tweets[i].text )	
	    console.log(tweetsText[i]);
		}
	  }
	});
}

//Function to print information from the SPOTIFY

function getSpotify(){

	//getting Spotify keys from keys.js (that reads .env)
	var spotify = new Spotify(keys.spotify);

    //Name of the new song
	var newSong;

	if(userInput2 === undefined){
		newSong='The Sign';
		//console.log(newSong);
	}

	else {
		newSong = userInput2;
		//console.log(newSong);
	}
	 
	spotify.search({ type: 'track', query: newSong}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log("Getting information about song: " + newSong);
	
	//Information about the song:
	//console.log(data.tracks.items[0]);
	
	console.log("\n" + "Performing Artist: " + data.tracks.items[0].artists[0].name);
	console.log("================================="); 
	console.log("\n" + "The song's name: " + data.tracks.items[0].name); 
	console.log("=================================");
	console.log("\n" + "A preview link: " + data.tracks.items[0].preview_url);
	console.log("================================="); 
	console.log("\n" + "The album: " + data.tracks.items[0].album.name);
	console.log("=================================");
	});

}



//Function to print information about the movie

function getMovie(){

//	var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
/*for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}
*/


	var nodeArgs = process.argv;

	var newMovie ="";

	if(userInput2 === undefined){
		newMovie='Mr Nobody';
	}

	else {
		// Loop through all the words in the node argument

		for (var i = 3; i < nodeArgs.length; i++) {

		  if (i > 3 && i < nodeArgs.length) {

		    newMovie = newMovie + "+" + nodeArgs[i];

		  }

		  else {

		    newMovie = userInput2;

		  }
		}

	}

	
	// Request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + newMovie + "&y=&plot=short&apikey=trilogy";

	//Debug against the actual URL.
	//console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	  	console.log("Getting information about movie: " + JSON.parse(body).Title);

	    // Parse the body of the site 
	    console.log("\n" +"Release Year: " + JSON.parse(body).Year);
	  	console.log("\n" +"Title: " + JSON.parse(body).Title);
	  	console.log("\n" +"IMDB rating: " + JSON.parse(body).imdbRating);
	  	console.log("\n" +"Rotten Tomatoes Rating: " + JSON.parse(body).tomatoerating);
	  	console.log("\n" +"Country produced: " + JSON.parse(body).Country);
	  	console.log("\n" +"Language of the movie: " + JSON.parse(body).Language);
	  	console.log("\n" +"Plot: " + JSON.parse(body).Plot);
	  	console.log("\n" +"Actors: " + JSON.parse(body).Actors);
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








	

