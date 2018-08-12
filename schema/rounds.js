module.exports = {
	getRound: {
		id: 'rounds.getRound',
		type: 'object',
		properties: {
			roundNumber: {
				type: 'integer',
				minimum: 1,
      },
      blockHeight: {
        type: 'integer',
        minimum: 1,
      },
		},
  },
}