'use strict';


module.exports = {
	getRound: {
		id: 'rounds.activeDelegates',
		type: 'object',
		properties: {
			round: {
				type: 'integer',
				minimum: 1
			}
		},
	},
	lastForgedBlocks: {
		id: 'rounds.activeDelegates.lastForgedBlocks',
		type: 'object',
		properties: {
			round: {
				type: 'integer',
				minimum: 1
			}
		},
	}
};
