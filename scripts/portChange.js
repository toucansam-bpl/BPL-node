var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '../newconfig.testnet.json');

try {
  //read newconfig.testnet.json
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  //change port number and seed peers list
  obj["port"] = 9030;
  obj["peers"]["list"] = [
    {"ip": "13.124.137.65","port": 9032},
    {"ip": "52.66.184.223","port": 9032},
    {"ip": "34.211.111.67","port": 9032},
    {"ip": "13.59.176.127","port": 9032},
    {"ip": "54.175.122.162","port": 9032},
    {"ip": "13.126.40.180","port": 9032},
    {"ip": "54.93.85.178","port": 9032},
    {"ip": "54.246.214.229","port": 9032},
    {"ip": "35.182.28.68","port": 9032},
    {"ip": "54.153.35.65","port": 9032},
    {"ip": "54.252.170.222","port": 9032},
    {"ip": "13.124.137.65","port": 9032},
    {"ip": "52.78.18.248","port": 9032},
    {"ip": "54.206.6.159","port": 9032},
    {"ip": "54.183.178.42","port": 9032},
    {"ip": "54.241.135.25","port": 9032},
    {"ip": "52.60.226.39","port": 9032},
    {"ip": "52.60.223.205","port": 9032},
    {"ip": "176.34.156.16","port": 9032},
    {"ip": "54.154.120.195","port": 9032},
    {"ip": "54.93.33.249","port": 9032}];

  var json = JSON.stringify(obj);
  //write to newconfig.testnet.json
  fs.writeFile(file, json);

} catch (e) {
    console.log('Inside Catch block', e);
}
