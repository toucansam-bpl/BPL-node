'use strict';

var balanceSql = {
      getVotersBalance: 'select "balance" from mem_accounts where "address" = ${address};'
  //getVotersBalance: 'select * from mem_accounts;'
};

module.exports = balanceSql;
