require("dotenv").config(); //from dotenv requirements

var keys = require("./keys.js");

var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require("fs");

var nodeArgs = process.argv;

var userInput1 = process.argv[2];

var userInput2 = process.argv[3];

var tweetsText=[];

var newSong;

//var words=[];

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
	console.log("\n" + "My TEXT IS BELOW:");
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

	if(userInput2 === undefined){
		newSong='The Sign';
		//console.log(newSong);
	}

	else {
		// Loop through all the words in the node argument

		for (var i = 3; i < nodeArgs.length; i++) {

		  if (i > 3 && i < nodeArgs.length) {

		    newSong = newSong + "+" + nodeArgs[i];
		  }
		  else {
		    newSong = userInput2;
		  }
		}
	}
	 
	spotify.search({ type: 'track', query: newSong}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log("\n" + "Getting information about song: " + data.tracks.items[0].name);
	
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

	var newMovie ="";

	if(userInput2 === undefined){
		newMovie='Mr Nobody';
	}

	else {
		// Loop through all the words in the node argument

		newMovie = userInput2;

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
	  	console.log("================================="); 
	  	console.log("\n" +"Title: " + JSON.parse(body).Title);
	  	console.log("================================="); 
	  	console.log("\n" +"IMDB rating: " + JSON.parse(body).imdbRating);
	  	console.log("================================="); 
	  	console.log("\n" +"Rotten Tomatoes Rating: " + JSON.parse(body).tomatoerating);
	  	console.log("================================="); 
	  	console.log("\n" +"Country produced: " + JSON.parse(body).Country);
	  	console.log("================================="); 
	  	console.log("\n" +"Language of the movie: " + JSON.parse(body).Language);
	  	console.log("================================="); 
	  	console.log("\n" +"Plot: " + JSON.parse(body).Plot);
	  	console.log("================================="); 
	  	console.log("\n" +"Actors: " + JSON.parse(body).Actors);
	  	console.log("================================="); 
	  }
	});

}
//Fuction that gets text from random.txt file
function getText(){
 
 
 	// The code will store the contents of the reading inside the variable "data"
 	fs.readFile("random.txt", "utf8", function(error, data) {
 
	 	// If the code experiences any errors it will log the error to the console.
	 	if (error) {
	 	    return console.log(error);
	 	}
	 
	 	//Print the contents of data
	 	console.log(data);
	 
	 	//Split it by commas (to make it more readable)
	 	var dataArr = data.split(",");
	 
	 	//GET THE SONG FROM RANDOM.TXT  

	 	var str1 = dataArr[1];
		var newStr = str1.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
		var songWords = newStr.split(" ");
	 	newSong="";
	 	  
	 	for (var i = 0; i < songWords.length; i++) {

			newSong = newSong + "+" + songWords[i];
		}

		//console.log("\n" + "We now check this song: " + newSong);
	 
	 	userInput2 = newSong;

	 	getSpotify();

	 	text = dataArr[1];

	 	writeText();

	 	//GET THE MOVIE FROM RANDOM.TXT

	 	var str2 = dataArr[3];
		var veryNewStr = str2.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
		var movieWords = veryNewStr.split(" ");
	 	newMovie="";
	 	  
	 	for (var i = 0; i < movieWords.length; i++) {

			newMovie = newMovie + "+" + movieWords[i];
		}

		console.log("\n" + "We now check this movie: " + newMovie);
	 
	 	userInput2 = newMovie; 

	 	getMovie();

	 	text = dataArr[3]; 

 		writeText();
 
 	});
 
 }

function writeText() {

	fs.appendFile("log.txt", text, function(err) {

	  // If the code experiences any errors it will log the error to the console.
	  if (err) {
	    return console.log(err);
	  }

	  console.log("\n" + "I posted information below in log.txt file!" + "\n");

	});

}
/*
fs.appendFile(textFile, "Hello Kitty", function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }

});
*/







	

