var express = require("express");
var router = express.Router();
var request = require('request-promise');

router.get('/', function(req,res){
	let eventId = req.query.eventId;
	// 

	const options = {
	  method: 'GET',
	  uri: 'https://app.ticketmaster.com/discovery/v2/events/'+ eventId +'?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m',
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

//https://app.ticketmaster.com/discovery/v2/events/G5eYZ48NmmOio?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m

});
module.exports = router;