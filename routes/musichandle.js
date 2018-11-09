var express = require("express");
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request-promise');

var code =
  'AQAgjS78s64u1axMCBCRA0cViW_ZDDU0pbgENJ_-WpZr3cEO7V5O-JELcEPU6pGLPp08SfO3dnHmu6XJikKqrU8LX9W6J11NyoaetrXtZFW-Y58UGeV69tuyybcNUS2u6eyup1EgzbTEx4LqrP_eCHsc9xHJ0JUzEhi7xcqzQG70roE4WKM_YrlDZO-e7GDRMqunS9RMoSwF_ov-gOMpvy9OMb7O58nZoc3LSEdEwoZPCLU4N4TTJ-IF6YsQRhQkEOJK';

var spotifyApi = new SpotifyWebApi({
  clientId: '48df0451ed6249859dd91fc2adf38711',
  clientSecret: '9bce939f8f0c4e5ab17c104b63691538',
  redirectUri: 'http://localhost:8081/spotifycall'
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving an access token',
      err.message
    );
  }
);


router.get('/', function(req,res){
	let artist = req.query.artist;
	let cx = req.query.cx;
	let imgSize = req.query.imgSize;
	let imgType = req.query.imgType;
	let num = req.query.num;
	let searchType = req.query.searchType;
	let key = req.query.key;

	// res.send('artist is:' + artist +  ' cx is:' + cx + ' imgSize is:' + imgSize + ' imgType is:' + imgType + ' num is:' + num + ' searchType is:' + searchType + ' key is:' + key);  
	spotifyApi.searchArtists(artist)
	  .then(function(data) {
	    console.log('Search result:', data.body);
	    // res.send(data.body);

	    if(data.body.artists.items.length != 0){
	    	var itemLength = data.body.artists.items.length;
		    var artistArr = [];
		    var resArr = [];
		    resArr.push(data.body);
		    for(var i = 0; i < itemLength; i++){
		    	var name = data.body.artists.items[i].name;
		    	artistArr.push(name);
		    }

		    for (var m = 0; m < artistArr.length; m++){
		    	var nameOut = artistArr[m];
		    	var options = {
				  method: 'GET',
				  uri: 'https://www.googleapis.com/customsearch/v1?q='+ nameOut +'&cx=' + cx + '&imgSize=' + imgSize +'&imgType=' + imgType + '&num=' + num + '&searchType=' + searchType + '&key=' + key,
				  json: true
				}

				request(options)
				  .then(function (response) {
				    // Request was successful, use the response object at will
				    resArr.push(response);
				    if(resArr.length - 1 == artistArr.length){
				    	res.send(resArr);
				    }
				  })
				  .catch(function (err) {
				    console.log(err);
			  	})
			}
	    }

	    else{
	    	console.log('Here we go');
	    	res.send('Fail to get artist info');
	    }
	    

	  }, function(err) {
	    console.error(err);
	    spotifyApi.clientCredentialsGrant().then(
		function(data) {
		    console.log('The access token expires in ' + data.body['expires_in']);
		    console.log('The access token is ' + data.body['access_token']);

		    // Save the access token so that it's used in future calls
		    spotifyApi.setAccessToken(data.body['access_token']);
		   	spotifyApi.searchArtists(artist)
			  .then(function(data) {
			  		console.log('Search result:', data.body);
				    // res.send(data.body);

				    if(data.body.artists.items.length != 0){
				    	var itemLength = data.body.artists.items.length;
					    var artistArr = [];
					    var resArr = [];
					    resArr.push(data.body);
					    for(var i = 0; i < itemLength; i++){
					    	var name = data.body.artists.items[i].name;
					    	artistArr.push(name);
					    }

					    for (var m = 0; m < artistArr.length; m++){
					    	var nameOut = artistArr[m];
					    	var options = {
							  method: 'GET',
							  uri: 'https://www.googleapis.com/customsearch/v1?q='+ nameOut +'&cx=' + cx + '&imgSize=' + imgSize +'&imgType=' + imgType + '&num=' + num + '&searchType=' + searchType + '&key=' + key,
							  json: true
							}

							request(options)
							  .then(function (response) {
							    // Request was successful, use the response object at will
							    resArr.push(response);
							    if(resArr.length - 1 == artistArr.length){
							    	res.send(resArr);
							    }
							  })
							  .catch(function (err) {
							    console.log(err);
						  	})
						}
				    }

				    else{
				    	console.log('Here we go');
				    	res.send('Fail to get artist info');
				    }

			  });
		  },
		  function(err) {
		    console.log(
		      'Something went wrong when retrieving an access token',
		      err.message
		    );
		  }
		);


	  });
});
module.exports = router;