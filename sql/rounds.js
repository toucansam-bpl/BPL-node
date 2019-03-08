'use strict';

var RoundsSql = {

  saveActiveDelegates: function (activedelegates) {
    var values = activedelegates.map(function(ad){
      return "('"+ad.publicKey+"', (${round})::bigint, ("+ad.vote+")::bigint)";
    }).join(",");

    return 'DELETE FROM mem_delegates where round = (${round})::bigint; INSERT INTO mem_delegates ("publicKey", round, vote) VALUES ' + values;
  },

  getActiveDelegates: 'SELECT * FROM mem_delegates WHERE round = (${round})::bigint ORDER BY vote DESC, "publicKey" ASC;',

  getRoundForgers: 'SELECT ENCODE("generatorPublicKey", \'hex\') as "publicKey" FROM blocks WHERE height > ${minheight} AND height < ${maxheight}+1 ORDER BY height desc;',

  updateActiveDelegatesStats: function (stats) {
    var statements = Object.keys(stats).map(function(pk){
      var stat = stats[pk];
      var statement = 'UPDATE mem_delegates SET ';
      statement += 'missedblocks = '+stat.missedblocks+',';
      statement += 'producedblocks = '+stat.producedblocks;
      statement += ' WHERE "publicKey" = \''+pk+'\' AND round = (${round})::bigint;';
      if(stat.missedblocks > 0){
        statement += 'UPDATE mem_accounts SET ';
        statement += 'missedblocks = missedblocks + ' + stat.missedblocks;
        statement += ' WHERE ENCODE("publicKey", \'hex\') = \''+pk+'\';';
      }
      return statement;
    });

    return statements.join("");
  },

  truncateBlocks: 'DELETE FROM blocks WHERE "height" > (${height})::bigint;',

  updateMissedBlocks: function (backwards) {
    return [
      'UPDATE mem_accounts SET "missedblocks" = "missedblocks"',
      (backwards ? '- 1' : '+ 1'),
      'WHERE "address" IN ($1:csv);'
     ].join(' ');
   },

  getTotalVotes: 'select ARRAY_AGG(a."accountId") as voters, SUM(b.balance) as vote FROM mem_accounts2delegates a, mem_accounts b where a."accountId" = b.address AND a."dependentId" = ${delegate};',

  updateVotes: 'UPDATE mem_accounts SET "vote" = "vote" + (${amount})::bigint WHERE "address" = ${address};',

  updateTotalVotes: 'UPDATE mem_accounts m SET vote = (SELECT COALESCE(SUM(b.balance), 0) as vote FROM mem_accounts2delegates a, mem_accounts b where a."accountId" = b.address AND a."dependentId" = encode(m."publicKey", \'hex\')) WHERE m."isDelegate" = 1;',

  updateBlockId: 'UPDATE mem_accounts SET "blockId" = ${newId} WHERE "blockId" = ${oldId};',

  getActiveDelegatesLastForgedBlock:
    'SELECT lastblocks.*'
  + '  FROM ('
  + '    SELECT *'
  + '      FROM mem_delegates'
  + '     WHERE round = (${round})::bigint'
  + '  ) d'
  + ' INNER JOIN ('
  + '   SELECT b.*'
  + '     FROM blocks_list b'
  + '    INNER JOIN ('
  + '      SELECT "b_generatorPublicKey", MAX(bl.b_height) LastBlockHeight'
  + '        FROM blocks_list bl'
  + '       WHERE bl.b_height < (${height})::bigint'
  + '       GROUP BY "b_generatorPublicKey"'
  + '     ) lbh'
  + '    ON b.b_height = lbh.lastblockheight'
  + '  ) lastblocks'
  + ' ON "publicKey" = lastblocks."b_generatorPublicKey"'
  + ';',

  getRoundBlocks:
    'SELECT *'
  + '  FROM blocks_list'
  + ' WHERE b_height >= (${startHeight})::bigint'
  + '   AND b_height <= (${endHeight})::bigint'
  + ' ORDER BY b_height ASC'
  + ';',

  getRoundDelegates:
    'SELECT a.username, a.address, ENCODE(a."publicKey", \'hex\') "publicKey", a.vote, a.missedblocks, a.producedblocks'
  + '  FROM mem_accounts a'
  + ' INNER JOIN ('
  + '    SELECT *'
  + '      FROM mem_delegates'
  + '     WHERE round = (${round})::bigint'
  + '   ) active'
  + '    ON active."publicKey" = ENCODE(a."publicKey", \'hex\')'
  + ' ORDER BY active.vote DESC, active."publicKey" ASC'
  + ';',
};

module.exports = RoundsSql;
