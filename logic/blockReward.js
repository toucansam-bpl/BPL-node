'use strict';

var constants = require('../helpers/constants.js');
var getVotersSql = require('../sql/getVotersOfDelegate.js');
var getBalanceSql = require('../sql/getBalance.js');
var noOfVotesSql = require('../sql/getNoOfVotesOfVoter.js');
// Private fields
var __private = {};

// Constructor
function BlockReward () {
	// Array of milestones
	this.milestones = constants.rewards.milestones;

	// Distance between each milestone
	this.distance = Math.floor(constants.rewards.distance);

	// Start rewards at block (n)
	this.rewardOffset = Math.floor(constants.rewards.offset);
}

// Private methods
__private.parseHeight = function (height) {
	if (isNaN(height)) {
		throw 'Invalid block height';
	} else {
		return Math.abs(height);
	}
};

// Public methods
//
//__API__ `calcMilestone`

//
BlockReward.prototype.calcMilestone = function (height) {
	var location = Math.trunc((__private.parseHeight(height) - this.rewardOffset) / this.distance);
	var lastMile = this.milestones[this.milestones.length - 1];

	if (location > (this.milestones.length - 1)) {
		return this.milestones.lastIndexOf(lastMile);
	} else {
		return location;
	}
};

//
//__API__ `calcReward`

//
BlockReward.prototype.calcReward = function (height) {
	height = __private.parseHeight(height);

	if (height < this.rewardOffset) {
		return 0;
	} else {
		return this.milestones[this.calcMilestone(height)];
	}
};

BlockReward.prototype.calcPercentageForMilestone = function (height) {
	height = __private.parseHeight(height);

	if (height < this.rewardOffset) {
		return -1;
	} else {
		var milestone = this.calcMilestone(height);
		switch(milestone){
			case 0: return 5;break;
			case 1: return 4;break;
			case 2: return 3;break;
			case 3: return 2;break;
			case 4: return 1;break;
			case 5: return 0;break;
		}
	}
};
//
//__API__ `calcSupply`

//
BlockReward.prototype.calcSupply = function (height) {

	height        = __private.parseHeight(height);
	var milestone = this.calcMilestone(height);
	var supply    = constants.totalAmount / Math.pow(10,8);
	var rewards   = [];

	var amount = 0, multiplier = 0;

	for (var i = 0; i < this.milestones.length; i++) {
		if (milestone >= i) {
			multiplier = (this.milestones[i] / Math.pow(10,8));

			if (height < this.rewardOffset) {
				break; // Rewards not started yet
			} else if (height < this.distance) {
				amount = height % this.distance; // Measure this.distance thus far
			} else {
				amount = this.distance; // Assign completed milestone
				height -= this.distance; // Deduct from total height

				// After last milestone
				if (height > 0 && i === this.milestones.length - 1) {
					var postHeight = this.rewardOffset - 1;

					if (height >= postHeight) {
						amount += (height - postHeight);
					} else {
						amount += (postHeight - height);
					}
				}
			}

			rewards.push([amount, multiplier]);
		} else {
			break; // Milestone out of bounds
		}
	}

	for (i = 0; i < rewards.length; i++) {
		var reward = rewards[i];
		supply += reward[0] * reward[1];
	}
return supply * Math.pow(10,8);
};


// calc reward based on percentage
// 25 million tokens + forging rewards of 5% Annual decreasing 1% per year
// until 1% Annual then switching to a fixed block reward of 0.1 BPL/Block thereafter.
BlockReward.prototype.customCalcReward = function (scope, dependentId, height, cb) {
	var self = this;
	var rewardAmount = 0;

	//calculate percentage corresponding to milestone
	var percent = self.calcPercentageForMilestone(height);
	if(percent > 0) {
		//get all voters for delegate using delegateId i.e public key
		scope.db.query(getVotersSql.getVotersWithPublicKey, { dependentId: dependentId}).then(function (voters) {
			if(voters.length > 0) {
				let votersTotalBalance = 0;
				var accountIds = voters[0].accountIds;
				for(let i = 0; i < accountIds.length; i++ ) {

					//get no of votes of this voter
						scope.db.query(noOfVotesSql.getNoOfVotes, { accountId:accountIds[i] }).then(function (votes) {
								//get balance of each of the voters
								scope.db.query(getBalanceSql.getVotersBalance, { address:accountIds[i] }).then(function (voter) {
									if (voter.length > 0) {
											try {
												//sum up balance of all voters
												votersTotalBalance = votersTotalBalance + (voter[0].balance/votes[0].count);
											} catch (e) {
											}
										}
										if(i === (accountIds.length - 1)) {
											//calculate reward amount based on current milestone percentage
											rewardAmount = (votersTotalBalance * percent)/100;
											return cb(null, rewardAmount);
										}
									}).catch(function (err) {
										return cb(err);
									});
						}).catch(function (err) {
							return cb(err);
						});

					}
				}
		}).catch(function (err) {
			return cb(err);
		});
	}
	else if(percent == 0){
		rewardAmount = 10000000; //0.1 BPL token
		return cb(null, rewardAmount);
	}
	else {
		return cb(null, rewardAmount);
	}
};

// Export
module.exports = BlockReward;
