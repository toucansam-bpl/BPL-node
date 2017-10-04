'use strict';
// Private fields
var __private = {};

function Script () {
}

Script.prototype.triggerPortChangeScript = function (height) {
  if(height == '126870') {
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

// Export
module.exports = Script;
