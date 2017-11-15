'use strict';
let program = require('commander');
let packageJson = require('../package.json');
let networks = require('../networks.json');
let constants = require('../constants.json');

program
	.version(packageJson.version)
	.option('-a, --activedelegates <activedelegates>', 'No. of active delegates')
	.option('-b, --blocktime <blocktime>', 'Block time in seconds')
	.option('-d, --distance <distance>', 'Distance between milestones')
	.option('-f, --fixedLastReward <lastMilestoneReward>', 'Last milestone fixed reward')
	.option('-l, --logo <logo>', 'Logo string')
	.option('-m, --milestones [milestones...]', 'Static or proportional reward values')
	.option('-o, --offset <offset>', 'Reward offset')
	.option('-r, --rewardtype <rewardtype>', 'Static or Proportional')
	.option('-s, --blocksize <blocksize>', 'Max transactions per block')
	.option('-t, --token <token>', 'Token name')
	.parse(process.argv)

if(program.activedelegates) {
	constants.activeDelegates = parseInt(program.activedelegates);
}
if(program.blocksize) {
	constants.maxTxsPerBlock = parseInt(program.blocksize);
}
if(program.blocktime) {
	constants.blocktime = parseInt(program.blocktime);
}
if(program.distance) {
	constants.rewards.distance = parseInt(program.distance);
}
let logo = "";
if(program.logo) {
	logo = program.logo;
}
if(program.rewardtype && program.milestones) {
	constants.rewards.type = program.rewardtype;
	constants.rewards.milestones = JSON.parse(program.milestones);

	let milestonesArr = JSON.parse(program.milestones);
	if(program.rewardtype.toLowerCase() === 'static')
		constants.rewards.milestones = milestonesArr;
	else if(program.rewardtype.toLowerCase() === 'proportional') {
		//calculate annual percentage factor
		let length = milestonesArr.length;
		for(let i=0; i<length; i++) {
			let annualPercent = milestonesArr[i]/(100*12*4*7);
			let blocksGeneratedPerYear = (60/constants.blocktime)*60*24*365;

			let blocksGeneratedPerDay = 0;
			if(i===0) {
				let offset = constants.rewards.offset;
				blocksGeneratedPerDay = (blocksGeneratedPerYear-offset)/365;
			}
			else {
				blocksGeneratedPerDay = blocksGeneratedPerYear/365;
			}
			let blocksGeneratedByEachDelegate = blocksGeneratedPerDay/constants.activeDelegates;
			let result = annualPercent/blocksGeneratedByEachDelegate;
			milestonesArr[i] = ''+result;
		}
		if(program.fixedLastReward) {
			constants.rewards.fixedLastReward = program.fixedLastReward;
			milestonesArr[length] = "0";
		}
		constants.rewards.milestones = milestonesArr;
	}
}
if(program.offset) {
	constants.rewards.offset = parseInt(program.offset);
}
if(program.token) {
	networks.sidechain.client.token = program.token;
	networks.sidechain.messagePrefix =  program.token+ " message:\n";
}

//Write to constants.json
var fs = require('fs');
fs.writeFile("../constants.json", JSON.stringify(constants), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Modified contents of constants.js!");
});

//Write to networks.json
var fs = require('fs');
fs.writeFile("../networks.json", JSON.stringify(networks), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Modified contents of networks.js!");
});

//Write to logo.txt
if(logo != "") {
	fs.writeFile("../logo.txt", logo, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("Modified contents of logo.txt!");
	});
}
