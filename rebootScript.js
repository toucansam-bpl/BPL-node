"use strict";
var request  = require ("request");

var urls = ["http://13.56.163.57:9030/api/blocks",
			"http://54.241.43.96:9030/api/blocks",
			"http://52.32.134.227:9030/api/blocks",
			"http://54.186.154.168:9030/api/blocks",
			"http://54.219.93.204:9030/api/blocks"];

var minutes = 15, the_interval = minutes * 60 * 1000;
setInterval(function() {

for (let i in urls){
	var heightSum = 0;
	var counter = 0 ;
	request.get({
		url:urls[i],
		json: true,
		timeout: 1000,
		headers : {'User-Agent':'request'}
	},(err,res,data) => {
		if (err) {
			console.log("the node is down");
		}
	else if (res.statusCode ==200){
		var heightLastBlock = data['blocks'][0]['height']
		heightSum = heightSum + heightLastBlock
		counter = counter + 1 
		matching(heightLastBlock,heightSum,counter);
	}
});
}
function matching(latestheightm,heightSum,counter){

	var averageHeight = heightSum/counter;
	var self_url = "http://127.0.0.1:9030/api/blocks/getHeight";
	request.get({
	url : self_url,
	json: true,
	timeout: 1000,
	headers : {'User-Agent':'request'}
},(err,res,data)=> {
	if (err){
		var cmd=require('node-cmd');
	    cmd.run(`forever restart app.js -g genesis.mainnet.json -c config.mainnet.json`);
	}
	else if (res.statusCode ==200){
		var self_height= data['height'];
		if ((averageHeight - self_height) < 10){
			console.log("all is good");
		}
		else if ((averageHeight - self_height) > 10){
    		var cmd=require('node-cmd');
		    cmd.run(`forever restart app.js -g genesis.mainnet.json -c config.mainnet.json`);
		}
	}
});
}
}, the_interval);