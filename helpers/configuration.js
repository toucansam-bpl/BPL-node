'use strict';

let http = require('http');
let fs = require('fs');
//let Logger = require('../logger.js');
let constants = require('../constants.json');

//let logger = new Logger({ echo: appConfig.consoleLogLevel, errorLevel: appConfig.fileLogLevel, filename: appConfig.logFileName });

function getConfiguration (name) {
  http.get('http://localhost:3000/sidechain/get?name='+name, (response) => {
    var data = '';
    response.on('data', function (chunk) {
      data += chunk;
    });
    response.on('end', function () {
      data = JSON.parse(data);
      if(data.status === 'success') {
        updateConfiguration(data.data);
      }
      else {
        console.log('Failed to get configurations for ',name);
      }
    });
  }).on("error", (err) => {
    console.log('Failed to get configurations from server: ',err);
  });
}

function updateConfiguration (data){
	constants.activeDelegates = data.activedelegates;
	constants.blocktime = data.blocktime;
	constants.maxTxsPerBlock = data.blocksize;
	constants.rewards.distance = data.distance;
	constants.rewards.offset = data.rewardoffset;
	constants.rewards.type = data.rewardtype;
	constants.rewards.milestones = data.milestones;
	constants.rewards.fixedLastReward = data.fixedlastreward;
	constants.totalAmount = data.totalamount;

	writeToFile("./constants.json", JSON.stringify(constants), function (err) {
		if (err) {
      console.log('Failed to update configurations: ',err);
    }
		else {
      console.log('Successfully updated configurations.');
    }
	});
	// if(networks != "")
	// 	writeToFile("../networks.json", JSON.stringify(networks));
}


function writeToFile (fileName, data, cb) {
	fs.writeFile(fileName, data, function (err) {
		if (err) {
			console.log('Failed to write configurations to constants.js: ',err);
			cb(err);
		}
		else {
			console.log('Configurations successfully written to constants.js');
			cb(null);
		}
	});
};

module.exports = getConfiguration;
