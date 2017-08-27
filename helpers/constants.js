'use strict';

module.exports = {
	activeDelegates: 201,
	maximumVotes: 1,
	addressLength: 208,
	blockHeaderLength: 248,
	confirmationLength: 77,
	epochTime: new Date(Date.UTC(2017, 2, 21, 13, 0, 0, 0)),
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
	blocktime: 15, //changed from 8 to 15
	numberLength: 100000000,
	requestLength: 104,
	rewards: {
		milestones: [
			'0.000005395150484435337', // Initial Reward
			'0.000004154265873015873', // Milestone 1
			'0.0000031156994047619045', // Milestone 2
			'0.0000020771329365079365', // Milestone 3
			'0.0000010385664682539682', // Milestone 4
			'0.1BPL'  // Milestone 5
		],
		offset: 80640,   // Start rewards after 14 days
		distance: 2102400, // 1 year distance between each milestone
	},
	signatureLength: 196,
	totalAmount: 2500000000000000,
	unconfirmedTransactionTimeOut: 10800 // 1080 blocks
};
