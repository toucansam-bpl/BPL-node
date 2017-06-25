'use strict';

var memAccountsSql = {
      getBalance: 'select "balance", "address" from mem_accounts where "address" = ${address};'
};

module.exports = memAccountsSql;
