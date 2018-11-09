var express = require("express");
var router = express.Router();
var request = require('request-promise');

router.get('/', function(req,res){
	let venue = req.query.venue;

	var option = {
	  method: 'GET',
	  uri: 'https://app.ticketmaster.com/discovery/v2/venues?apikey=TFJrOcWBZ1vKZC0LCcBXTiJYvAEjU55m&keyword=' + venue,
	  json: true
	}

	request(option)
	  .then(function (response) {
	    // Request was successful, use the response object at will
	    console.log(response);
	    res.send(response);
		
	  })
	  .catch(function (err) {
	    console.log(err);
  	})


	// res.send('q is:' + q +  ' cx is:' + cx + ' imgSize is:' + imgSize + ' imgType is:' + imgType + ' num is:' + num + ' searchType is:' + searchType + ' key is:' + key);  
});

module.exports = router;