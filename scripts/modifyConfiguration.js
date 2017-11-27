'use strict';
let program = require('commander');
let packageJson = require('../package.json');
let networks = require('../networks.json');
let constants = require('../constants.json');
let fs = require('fs');

let str = "In modifyConfiguration >>>>>>>>>>>>>>>>>>";

// program
// 	.version(packageJson.version)
// 	.option('-a, --activedelegates <activedelegates>', 'No. of active delegates')
// 	.option('-b, --blocktime <blocktime>', 'Block time in seconds')
// 	.option('-d, --distance <distance>', 'Distance between milestones')
// 	.option('-f, --fixedlastreward <lastMilestoneReward>', 'Last milestone fixed reward')
// 	.option('-l, --logo <logo>', 'Logo string')
// 	.option('-m, --milestones [milestones...]', 'Static or proportional reward values')
// 	.option('-o, --offset <offset>', 'Reward offset')
// 	.option('-r, --rewardtype <rewardtype>', 'Static or Proportional')
// 	.option('-s, --blocksize <blocksize>', 'Max transactions per block')
// 	.option('-t, --token <token>', 'Token name')
// 	.parse(process.argv)
//
// if(program.activedelegates) {
// 	constants.activeDelegates = parseInt(program.activedelegates);
// }
// if(program.blocksize) {
// 	constants.maxTxsPerBlock = parseInt(program.blocksize);
// }
// if(program.blocktime) {
// 	constants.blocktime = parseInt(program.blocktime);
// }
// if(program.distance) {
// 	constants.rewards.distance = parseInt(program.distance);
// }
// let logo = "";
// if(program.logo) {
// 	logo = program.logo;
// }
// if(program.rewardtype && program.milestones) {
// 	 str = str + "In if program.rewardtype && program.milestones ";
// 	let milestonesArr = JSON.parse(program.milestones);
// 	if(program.rewardtype.toLowerCase() === 'static') {
// 		str = str + "in if program.rewardtype.toLowerCase() === 'static'";
// 		constants.rewards.type = 'static';
// 		constants.rewards.milestones = milestonesArr;
// 	}
// 	else {
// 		str = str + "in if program.rewardtype.toLowerCase() === 'proportional'";
// 		constants.rewards.type = 'proportional';
// 		//calculate annual percentage factor
// 		let length = milestonesArr.length;
// 		for(let i=0; i<length; i++) {
// 			let annualPercent = milestonesArr[i]/(100*12*4*7);
// 			let blocksGeneratedPerYear = (60/constants.blocktime)*60*24*365;
//
// 			let blocksGeneratedPerDay = 0;
// 			if(i===0) {
// 				let offset = constants.rewards.offset;
// 				blocksGeneratedPerDay = (blocksGeneratedPerYear-offset)/365;
// 			}
// 			else {
// 				blocksGeneratedPerDay = blocksGeneratedPerYear/365;
// 			}
// 			let blocksGeneratedByEachDelegate = blocksGeneratedPerDay/constants.activeDelegates;
// 			let result = annualPercent/blocksGeneratedByEachDelegate;
// 			milestonesArr[i] = ''+result;
// 		}
// 		if(program.fixedlastreward) {
// 			constants.rewards.fixedLastReward = program.fixedlastreward;
// 			milestonesArr[length] = "0";
// 		}
// 		constants.rewards.milestones = milestonesArr;
// 	}
//
// 	 str = str + constants.rewards.type +" "+typeof(constants.rewards.type)+"  program.milestones "+program.milestones+" "+constants.rewards.milestones +" "+typeof(constants.rewards.milestones);
// }
// if(program.offset) {
// 	constants.rewards.offset = parseInt(program.offset);
// }
// if(program.token) {
// 	networks.sidechain.client.token = program.token;
// 	networks.sidechain.messagePrefix =  program.token+ " message:\n";
// }
//
// //Write to constants.json
// fs.writeFile("../constants.json", JSON.stringify(constants), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("Modified contents of constants.js!");
// });
//
// //Write to networks.json
// fs.writeFile("../networks.json", JSON.stringify(networks), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("Modified contents of networks.js!");
// });
//
// //Write to logo.txt
// if(logo != "") {
// 	fs.writeFile("../logo.txt", logo, function(err) {
// 	    if(err) {
// 	        return console.log(err);
// 	    }
// 	    console.log("Modified contents of logo.txt!");
// 	});
// }

if(str != "") {
	fs.writeFile("../dump.txt", str, function(err) {
			if(err) {
					return console.log(err);
			}
			console.log("Modified contents of dump.txt!");
	});
}
