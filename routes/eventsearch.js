var express = require("express");
var router = express.Router();
var geohash = require('ngeohash');
var request = require('request-promise');
 
router.get('/', function(req,res){
	let keyword = req.query.keyword;
	let choice = req.query.choice;
	let distance = req.query.distance;
	if(req.query.measurement == 'default'){
		var measurement = 'miles';
	}
	else{
		var measurement = req.query.measurement;
	}

	let userLocation = req.query.userLocation;

	if(choice == "music"){
		var segId = "KZFzniwnSyZfZ7v7nJ";
	}
	else if(choice == "sports"){
		var segId = "KZFzniwnSyZfZ7v7nE";
	}
	else if(choice == "arts&theatre"){
		var segId = "KZFzniwnSyZfZ7v7na";
	}
	else if(choice == "film"){
		var segId = "KZFzniwnSyZfZ7v7nn";
	}
	else if(choice == "miscellaneous"){
		var segId = "KZFzniwnSyZfZ7v7nn";
	}
	else{
		var segId ="";
	}

	if (userLocation.includes(',') && userLocation.includes('.')){
		let index = userLocation.indexOf(',');
		var userLat = userLocation.substring(0, index);
		var userLon = userLocation.substring(index + 1, userLocation.length);
		var geoPoint = geohash.encode(userLat, userLon);
		
		if(segId.length == 0){
			const options = {
			  method: 'GET',
			  uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=' + keyword + '&segmentId&radius=' + distance + '&unit=' + measurement +'&geoPoint=' + geoPoint,
			  json: true
			}

			request(options)
			  .then(function (response) {
			    // Request was successful, use the response object at will
			    console.log(response);
				res.send(response);
			  })
			  .catch(function (err) {
			    console.log(err);
		  	})
		}
		else{

			const options = {
			  method: 'GET',
			  uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=' + keyword + '&segmentId=' + segId + '&radius=' + distance + '&unit=' + measurement +'&geoPoint=' + geoPoint,
			  json: true
			}

			request(options)
			  .then(function (response) {
			    // Request was successful, use the response object at will
			    console.log(response);
				res.send(response);
			  })
			  .catch(function (err) {
			    console.log(err);
		  	})
		}
		
	}
	
	else{
		const geoOptions = {
		  method: 'GET',
		  uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+ userLocation +'&key=AIzaSyDMiwLQglmBWZsPWiTPavsvJgtc_pJdgdQ',
		  json: true
		}
		request(geoOptions)
		  .then(function (response) {
		    // Request was successful, use the response object at will

		    var currentLat = response.results[0].geometry.location.lat.toString();
		    var currentLon = response.results[0].geometry.location.lng.toString();
		    var geoPoint = geohash.encode(currentLat, currentLon);

		    if(segId.length == 0){
		    	const options = {
				  method: 'GET',
				  uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=' + keyword + '&segmentId&radius=' + distance + '&unit=' + measurement +'&geoPoint=' + geoPoint,
				  json: true
				}

				request(options)
				  .then(function (response) {
				    // Request was successful, use the response object at will
				    console.log(response);
					res.send(response);
				  })
				  .catch(function (err) {
				    console.log(err);
			  	})
		    }

		    else{
		    	const options = {
				  method: 'GET',
				  uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=' + keyword + '&segmentId=' + segId + '&radius=' + distance + '&unit=' + measurement +'&geoPoint=' + geoPoint,
				  json: true
				}

				request(options)
				  .then(function (response) {
				    // Request was successful, use the response object at will
				    console.log(response);
					res.send(response);
				  })
				  .catch(function (err) {
				    console.log(err);
			  	})
		    }

		  })

		  .catch(function (err) {
		    console.log(err);
		  })
//https://app.ticketmaster.com/discovery/v2/events.json?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=Lakers&segmentId&radius=10&unit=km&geoPoint=9q5cs6kgk
	}
	
});
module.exports = router;