'use strict';

var noOfVotesSql = {
    getNoOfVotes: 'SELECT count(*)  FROM mem_accounts2delegates WHERE "accountId" = ${accountId};'
};

module.exports = noOfVotesSql;
