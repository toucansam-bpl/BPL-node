'use strict';
var program = require('commander');
var packageJson = require('../package.json');

let constants = {
	activeDelegates: 201,
	maximumVotes: 1,
	addressLength: 208,
	blockHeaderLength: 248,
	confirmationLength: 77,
	epochTime: "2017-03-21T13:00:00.000Z",
	fees:{
		send: 10000000,
		vote: 100000000,
		secondsignature: 500000000,
		delegate: 1000000000,
		multisignature: 500000000
	},
	feeStart: 1,
	feeStartVolume: 10000 * 100000000,
	fixedPoint : Math.pow(10, 8),
	forgingTimeOut: 3060, // 102 blocks / 2 rounds
	maxAddressesLength: 208 * 128,
	maxAmount: 100000000,
	maxClientConnections: 100,
	maxConfirmations : 77 * 100,
	maxPayloadLength: 2 * 1024 * 1024,
	maxRequests: 10000 * 12,
	maxSignaturesLength: 196 * 256,
	maxTxsPerBlock: 50,
	blocktime: 15,
	numberLength: 100000000,
	requestLength: 104,
	rewards: {
		type: "proportional",
		fixLastMilestoneReward: true,
		lastMilestoneReward: '10000000',
		milestones: [
			'0.000005395150484435337', // Initial Reward
			'0.000004154265873015873', // Milestone 1
			'0.0000031156994047619045', // Milestone 2
			'0.0000020771329365079365', // Milestone 3
			'0.0000010385664682539682', // Milestone 4
			'0'  // Milestone 5
		],
		// milestones: [
		// 	"500000000", // Initial Reward
		// 	"400000000", // Milestone 1
		// 	"300000000", // Milestone 2
		// 	"200000000", // Milestone 3
		// 	"100000000" // Milestone 4
		// ],
		offset: 80640,   // Start rewards after 14 days
		distance: 3//2102400, // 1 year distance between each milestone
	},
	signatureLength: 196,
	totalAmount: 2500000000000000,
	unconfirmedTransactionTimeOut: 10800 // 1080 blocks
};

program
	.version(packageJson.version)
	.option('-s, --blocksize <blocksize>', 'Max transactions per block')
	.option('-t, --blocktime <blocktime>', 'Block time in seconds')
	.option('-d, --activedelegates <activedelegates>', 'No. of active delegates')
	.option('-r, --rewardtype <rewardtype>', 'Static or Proportional')
	.option('-m, --milestones [milestones...]', 'Static or proportional reward values')
	.option('-l, --logo <logo>', 'Logo string')
	.parse(process.argv)

if(program.blocksize) {
	constants.maxTxsPerBlock = program.blocksize;
}
if(program.blocktime) {
	constants.blocktime = program.blocktime;
}
if(program.activedelegates) {
	constants.activeDelegates = program.activedelegates;
}
if(program.rewardtype && program.milestones) {
	constants.rewards.type = program.rewardtype;
	constants.rewards.milestones = JSON.parse(program.milestones);

	let milestonesArr = JSON.parse(program.milestones);
	if(program.rewardtype === 'static')
		constants.rewards.milestones = milestonesArr;
	else if(program.rewardtype === 'proportional') {
		//calculate annual percentage factor
		for(let i=0; i<milestonesArr.length; i++) {
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
			milestonesArr[i] = ''+annualPercent/blocksGeneratedByEachDelegate;
		}
		constants.rewards.milestones = milestonesArr;
	}
}

let logo = "";
if(program.logo) {
	logo = program.logo;
}

//Write to constants.js
var fs = require('fs');
fs.writeFile("../helpers/constants.js", "'use strict'; module.exports = "+JSON.stringify(constants)+";", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Modified contents of constants.js!");
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
