var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '../config2.testnet.json');

try {
  //read config2.testnet.json
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  //change port number and seed peers list
  obj["port"] = 9030;
  obj["peers"]["list"] = [
  {"ip": "184.72.114.73","port": 9030},
  {"ip": "54.211.148.230","port": 9030},
  {"ip": "54.210.51.3","port": 9030},
  {"ip": "54.205.47.42","port": 9030},
  {"ip": "54.172.122.227","port": 9030},
  {"ip": "54.159.167.136","port": 9030},
  {"ip": "54.157.232.104","port": 9030},
  {"ip": "54.152.27.237","port": 9030}];

  var json = JSON.stringify(obj);
  //write to config2.testnet.json
  fs.writeFile(file, json);

} catch (e) {
    console.log('Inside Catch block', e);
}
