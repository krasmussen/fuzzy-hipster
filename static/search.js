
function searchButtonPressed(){

	// get value from search field
	//var searchInput = encodeURIComponent(searchfield.value);
	var searchInput = encodeURIComponent(document.getElementById('searchfield').value);

	// Query api
	$.getJSON("http://www.omdbapi.com/?s=" + searchInput, function dostuff(json){
		results = json['Search'];
		/*This should return a 'Search' object that is an array of other objects that look like this:
		Title: string
		Year: string
		imdbID: string
		Type: string
		*/

		// if multiple results returned pop up a box asking which result to use

		if (results.length > 1) {
			choice = resultChoicePrompt(results);
			// stop if user canceled from choice prompt
			if ( choice == -1 ) {
				return
			}
		}
		else {
			// only one choice set to 0 as it is the only option
			choice = 0
		}

		// autofill prompts based off smdbid
		autoFill(results[choice]['imdbID'])



	});

}

function resultChoicePrompt(results){


	// set an initial mesage for the prompt
	message = "Multiple results found please choose which result you want to use by inputing the number of the result int othe input box. \n"

	// Loop through building a message for the prompt choices


	for (var i = 0; i < results.length; i++) {
		message = message + i + "\n\tTitle: " + results[i]['Title'] + "\n\tYear: " + results[i]['Year'] + "\n\timdbID: " + results[i]['imdbID'] + "\n\tType: " + results[i]['Type'] + "\n";
	}

	while ( true ) {
		var choice = prompt(message);
		if (choice < "0" || choice > results.length - 1) {
			// user didn't input a number or the number was out of range alert them as such
			alert("Please choose the NUMBER of the entry you want.");
		}
		else if ( choice == null ){
			// return -1 if canceled
			return -1
		}
		else {
			break
		}
	}

	return choice

}

function autoFill(imdbID){

	// get details used for autofill
	$.getJSON("http://www.omdbapi.com/?i=" + encodeURIComponent(imdbID), function dostuff(json){
		/*
		This should return a dictionary that should look like this:
		Title: string
		Year:
		Rated:
		Released:
		Runtime:
		Genre:
		Director:
		Writer:
		Actors:
		Plot:
		Language:
		Country:
		Awards:
		Poster:
		Metascore:
		imdbRating:
		imdbVotes:
		imdbID:
		Type:
		Response:
		*/

		/*
		We will be using the following for autofill
		title
		style (live action / animated)
		year
		runtime
		format (DVD / Bluray / VHS / ETC)
		Genre
		Actors
		*/

		/* list all possible values
		message = ""

		for (var key in json){
			message = message + key + ": " + json[key] + "\n";
		}
		alert(message);
		*/

		document.getElementById('titlefield').value=json['Title'];
		document.getElementById('yearfield').value=json['Year'];
		document.getElementById('runtimefield').value=json['Runtime'];
		document.getElementById('genrefield').value=json['Genre'];
		document.getElementById('actorsfield').value=json['Actors'];

	});
}