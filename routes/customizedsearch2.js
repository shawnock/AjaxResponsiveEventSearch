var express = require("express");
var router = express.Router();
var request = require('request-promise');

router.get('/', function(req,res){
	let q = req.query.q;
	if(req.query.q2 != null){
		var q2 = req.query.q2;
	}
	let cx = req.query.cx;
	let imgSize = req.query.imgSize;
	let imgType = req.query.imgType;
	let num = req.query.num;
	let searchType = req.query.searchType;
	let key = req.query.key;
	var responseArr = [];

	var option1 = {
	  method: 'GET',
	  uri: 'https://www.googleapis.com/customsearch/v1?q='+ q +'&cx=' + cx + '&imgSize=' + imgSize +'&imgType=' + imgType + '&num=' + num + '&searchType=' + searchType + '&key=' + key,
	  json: true
	}

	request(option1)
	  .then(function (response) {
	    // Request was successful, use the response object at will
	    console.log(response);
	    responseArr.push(response);

	   	var option2 = {
		  method: 'GET',
		  uri: 'https://www.googleapis.com/customsearch/v1?q='+ q2 +'&cx=' + cx + '&imgSize=' + imgSize +'&imgType=' + imgType + '&num=' + num + '&searchType=' + searchType + '&key=' + key,
		  json: true
		}

		request(option2)
			.then(function (response2){
				console.log(response2);
	    		responseArr.push(response2);
	    		res.send(responseArr);

			})
			.catch(function (err){
	    		console.log(err);
	    	})
		
	  })
	  .catch(function (err) {
	    console.log(err);
  	})


	// res.send('q is:' + q +  ' cx is:' + cx + ' imgSize is:' + imgSize + ' imgType is:' + imgType + ' num is:' + num + ' searchType is:' + searchType + ' key is:' + key);  

	// https://www.googleapis.com/customsearch/v1?q=Los%20Angeles%20Lakers&cx=004394602356333104116:vfroutcovcg&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyBlMveOdqCYRAHF-JabEw1nesTH0q7XMLA
});

module.exports = router;