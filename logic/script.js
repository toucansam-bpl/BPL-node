'use strict';
var path = require('path');
var request = require('request');
var fs = require('fs');
var childProcess = require('child_process');
var packageJson = require('../package.json');
var config = require('../'+process.env.CONFIG_NAME);
var git = require('git-utils');

// Private fields
var __private = {};

function Script () {
}

Script.prototype.triggerPortChangeScript = function (height) {
  if(height == '260000') {
    var sys  = require('util'),
        exec = require('child_process').exec,
        child;
      child = exec('sh scripts/portChange.sh', function (error, stdout, stderr)
      {
          if (error)
             console.log('There was an error executing the script');
          console.log('Sucessfully executed the script!!!');
      });
  }
};

Script.prototype.getUpdatesFromGit = function (height) {
  var options = {
    url: 'https://api.github.com/repos/marilynpereira03/BPL-node/releases/latest',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
    };
      request(options, function (err, res) {
        let response = JSON.parse(res.body);
        if(!err)
          {
            let spawn = childProcess.spawn;
            let gitReleaseVersion = response.tag_name.split(".");
            let gitReleaseBranch = response.target_commitish;
            let packageJsonVersion = packageJson.version.split(".");
            let repository = git.open(__dirname);
            let localBranch = repository.getHead();
            localBranch = path.basename(localBranch);
            if(localBranch == gitReleaseBranch) {
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
           }
        else {
           console.log("There was an error while getting latest updates from GiT.");
        }
      });
};
module.exports = Script;
