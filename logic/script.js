'use strict';
var path = require('path');
var request = require('request');
var fs = require('fs');
let childProcess = require('child_process');
var packageJson = require('../package.json');
var config = require('../'+process.env.CONFIG_NAME);
var git = require('git-utils');
// Private fields
var __private = {};


function Script () {
}

Script.prototype.getUpdatesFromGit = function () {
  var options = {
    url: 'https://test.bit.blockpool.io/insecure/utilities/delegatenodeversion',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
    };
    var repository = git.open(__dirname);
    var localBranch=repository.getHead();
    localBranch=path.basename(localBranch);
     if(localBranch!="bpl-mainnet"){
       options.url=options.url+"?branch="+localBranch;
     }
      request(options, function (err, res) {
        let response = JSON.parse(res.body);
        if(response.result.length){
          if(!err)
            {
              let spawn = childProcess.spawn;
              let gitReleaseVersion = response.result[0].version.split(".");
              let packageJsonVersion =  packageJson.version.split(".");
               if(gitReleaseVersion[0] > packageJsonVersion[0] || gitReleaseVersion[1] > packageJsonVersion[1])
                 {
                   spawn('bash',['scripts/gitUpdates.sh', '1', process.env.CONFIG_NAME, process.env.GENESIS_NAME, config.port]);
                 }
               else
                {
                  if(gitReleaseVersion[2] > packageJsonVersion[2])
                  {
                    spawn('bash',['scripts/gitUpdates.sh', '0', process.env.CONFIG_NAME, process.env.GENESIS_NAME, config.port]);
                  }
                }
             }
          else {
             console.log("There was an error while getting latest updates from GiT.");
          }
        }
      });
};
// Export
module.exports = Script;
