var express = require("express");
var router = express.Router();
var request = require('request-promise');

router.get('/', function(req,res){

	let venue = req.query.venue;

	const options = {
	  method: 'GET',
	  uri: 'https://api.songkick.com/api/3.0/search/venues.json?query='+ venue +'&apikey=orgJF8RPtu2oaLrA',
	  json: true
	}

	request(options)
	  .then(function (response) {
	    // Request was successful, use the response object at will
	    if(response.resultsPage.results.venue != undefined){
	    	var venueId = response.resultsPage.results.venue[0].id;
		    console.log('venueId is:' + venueId);

		    var option2 = {
			  method: 'GET',
			  uri: 'https://api.songkick.com/api/3.0/venues/'+ venueId +'/calendar.json?apikey=orgJF8RPtu2oaLrA',
			  json: true
			}
			request(option2)
				.then(function(response2){
					res.send(response2);
				})
				.catch(function (err) {
				    console.log(err);
			  	})
	    }

	    else{
	    	res.send('No Venue Info');
	    }
	    
		
	  })
	  .catch(function (err) {
	    console.log(err);
  	})

//'https://api.songkick.com/api/3.0/venues/calendar.json?apikey=orgJF8RPtu2oaLrA',
});
module.exports = router;