'use strict';

var votersSql = {
   getVotersWithPublicKey: 'SELECT ARRAY_AGG("accountId") AS "accountIds" FROM mem_accounts2delegates WHERE "dependentId" = ${dependentId};'
};

module.exports = votersSql;
