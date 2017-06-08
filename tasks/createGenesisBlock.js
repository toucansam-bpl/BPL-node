var moment = require('moment');
var fs = require('fs');
var path = require('path');
var arkjs = require('arkjs');
var crypto = require('crypto');
var bip39 = require('bip39');
var ByteBuffer = require('bytebuffer');
var bignum = require('../helpers/bignum.js');
var ed = require('../helpers/ed.js');
var networks = require('../networks.json');

//added to get different config files
var seed_peers = [
  {
    ip: "52.15.205.55",
    port: 4000,
    aws: "ec2-52-15-205-55.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.130.158",
    port: 4000,
    aws: "ec2-13-58-130-158.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.15.233.137",
    port: 4000,
    aws: "ec2-52-15-233-137.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.174.137",
    port: 4000,
    aws: "ec2-13-58-174-137.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.130.107",
    port: 4000,
    aws: "ec2-13-58-130-107.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.157.77",
    port: 4000,
    aws: "ec2-13-58-157-77.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.15.233.250",
    port: 4000,
    aws: "ec2-52-15-233-250.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.14.198.222",
    port: 4000,
    aws: "ec2-52-14-198-222.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.15.224.42",
    port: 4000,
    aws: "ec2-52-15-224-42.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.124.122",
    port: 4000,
    aws: "ec2-13-58-124-122.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.14.240.138",
    port: 4000,
    aws: "ec2-52-14-240-138.us-east-2.compute.amazonaws.com"
  },

{
    ip: "13.58.9.73",
    port: 4000,
    aws: "ec2-13-58-9-73.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.148.122",
    port: 4000,
    aws: "ec2-13-58-148-122.us-east-2.compute.amazonaws.com"
  },

{
    ip: "13.58.128.246",
    port: 4000,
    aws: "ec2-13-58-128-246.us-east-2.compute.amazonaws.com"
  },{
    ip: "13.58.106.145",
    port: 4000,
    aws: "ec2-13-58-106-145.us-east-2.compute.amazonaws.com"
  },

{
    ip: "54.153.35.65",
    port: 4000,
    aws: "ec2-54-153-35-65.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.183.178.42",
    port: 4000,
    aws: "ec2-54-183-178-42.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.241.135.25",
    port: 4000,
    aws: "ec2-54-241-135-25.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.183.177.13",
    port: 4000,
    aws: "ec2-54-183-177-13.us-west-1.compute.amazonaws.com"
  },

{
    ip: "52.53.202.67",
    port: 4000,
    aws: "ec2-52-53-202-67.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.67.105.171",
    port: 4000,
    aws: "ec2-54-67-105-171.us-west-1.compute.amazonaws.com"
  },

{
    ip: "52.53.154.54",
    port: 4000,
    aws: "ec2-52-53-154-54.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.183.31.221",
    port: 4000,
    aws: "ec2-54-183-31-221.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.219.167.117",
    port: 4000,
    aws: "ec2-54-219-167-117.us-west-1.compute.amazonaws.com"
  },

{
    ip: "54.153.59.159",
    port: 4000,
    aws: "ec2-54-153-59-159.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.215.143.117",
    port: 4000,
    aws: "ec2-54-215-143-117.us-west-1.compute.amazonaws.com"
  },

{
    ip: "52.53.223.107",
    port: 4000,
    aws: "ec2-52-53-223-107.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.215.249.24",
    port: 4000,
    aws: "ec2-54-215-249-24.us-west-1.compute.amazonaws.com"
  },
{
    ip: "52.53.212.68",
    port: 4000,
    aws: "ec2-52-53-212-68.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.153.1.207",
    port: 4000,
    aws: "ec2-54-153-1-207.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.218.127.126",
    port: 4000,
    aws: "ec2-54-218-127-126.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.212.195.84",
    port: 4000,
    aws: "ec2-54-212-195-84.us-west-2.compute.amazonaws.com"
  },

{
    ip: "54.202.104.163",
    port: 4000,
    aws: "ec2-54-202-104-163.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.191.46.227",
    port: 4000,
    aws: "ec2-54-191-46-227.us-west-2.compute.amazonaws.com"
  },{
    ip: "34.209.152.172",
    port: 4000,
    aws: "ec2-34-209-152-172.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.218.63.88",
    port: 4000,
    aws: "ec2-54-218-63-88.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.244.37.13",
    port: 4000,
    aws: "ec2-54-244-37-13.us-west-2.compute.amazonaws.com"
  },

{
    ip: "54.213.242.153",
    port: 4000,
    aws: "ec2-54-213-242-153.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.209.138.43",
    port: 4000,
    aws: "ec2-34-209-138-43.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.245.183.15",
    port: 4000,
    aws: "ec2-54-245-183-15.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.187.247.143",
    port: 4000,
    aws: "ec2-54-187-247-143.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.223.252.3",
    port: 4000,
    aws: "ec2-34-223-252-3.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.211.112.137",
    port: 4000,
    aws: "ec2-34-211-112-137.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.211.53.12",
    port: 4000,
    aws: "ec2-34-211-53-12.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.214.122.99",
    port: 4000,
    aws: "ec2-54-214-122-99.us-west-2.compute.amazonaws.com"
  },
{
    ip: "35.182.28.68",
    port: 4000,
    aws: "ec2-35-182-28-68.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.226.39",
    port: 4000,
    aws: "ec2-52-60-226-39.ca-central-1.compute.amazonaws.com"
  },{
    ip: "52.60.223.205",
    port: 4000,
    aws: "ec2-52-60-223-205.ca-central-1.compute.amazonaws.com"
  },

{
    ip: "52.60.187.26",
    port: 4000,
    aws: "ec2-52-60-187-26.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "35.182.20.108",
    port: 4000,
    aws: "ec2-35-182-20-108.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "35.182.24.15",
    port: 4000,
    aws: "ec2-35-182-24-15.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "35.182.17.32",
    port: 4000,
    aws: "ec2-35-182-17-32.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.188.7",
    port: 4000,
    aws: "ec2-52-60-188-7.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.185.192",
    port: 4000,
    aws: "ec2-52-60-185-192.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.193.171",
    port: 4000,
    aws: "ec2-52-60-193-171.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.162.121",
    port: 4000,
    aws: "ec2-52-60-162-121.ca-central-1.compute.amazonaws.com"
  },{
    ip: "35.182.13.245",
    port: 4000,
    aws: "ec2-35-182-13-245.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "35.182.15.188",
    port: 4000,
    aws: "ec2-35-182-15-188.ca-central-1.compute.amazonaws.com"
  },

{
    ip: "35.183.254.176",
    port: 4000,
    aws: "ec2-35-183-254-176.ca-central-1.compute.amazonaws.com"
  },{
    ip: "52.60.238.50",
    port: 4000,
    aws: "ec2-52-60-238-50.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "54.246.214.229",
    port: 4000,
    aws: "ec2-54-246-214-229.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "176.34.156.16",
    port: 4000,
    aws: "ec2-176-34-156-16.eu-west-1.compute.amazonaws.com"
  },

{
    ip: "54.154.120.195",
    port: 4000,
    aws: "ec2-54-154-120-195.eu-west-1.compute.amazonaws.com"
  },{
    ip: "176.34.153.112",
    port: 4000,
    aws: "ec2-176-34-153-112.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.154.227.162",
    port: 4000,
    aws: "ec2-54-154-227-162.eu-west-1.compute.amazonaws.com"
  },

{
    ip: "54.154.209.143",
    port: 4000,
    aws: "ec2-54-154-209-143.eu-west-1.compute.amazonaws.com"
  },{
    ip: "54.194.71.103",
    port: 4000,
    aws: "ec2-54-194-71-103.eu-west-1.compute.amazonaws.com"
  },

{
    ip: "54.154.130.173",
    port: 4000,
    aws: "ec2-54-154-130-173.eu-west-1.compute.amazonaws.com"
  },{
    ip: "52.66.184.223",
    port: 4000,
    aws: "ec2-52-66-184-223.ap-south-1.compute.amazonaws.com"
  },

{
    ip: "54.194.150.18",
    port: 4000,
    aws: "ec2-54-194-150-18.eu-west-1.compute.amazonaws.com"
  },{
    ip: "54.246.176.39",
    port: 4000,
    aws: "ec2-54-246-176-39.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.171.82.35",
    port: 4000,
    aws: "ec2-54-171-82-35.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.194.98.230",
    port: 4000,
    aws: "ec2-54-194-98-230.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.154.31.62",
    port: 4000,
    aws: "ec2-54-154-31-62.eu-west-1.compute.amazonaws.com"
  },

{
    ip: "54.194.232.186",
    port: 4000,
    aws: "ec2-54-194-232-186.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.229.213.96",
    port: 4000,
    aws: "ec2-54-229-213-96.eu-west-1.compute.amazonaws.com"
  },{
    ip: "52.14.220.4",
    port: 4000,
    aws: "ec2-52-14-220-4.us-east-2.compute.amazonaws.com"
  },

{
    ip: "13.58.212.34",
    port: 4000,
    aws: "ec2-13-58-212-34.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.220.91",
    port: 4000,
    aws: "ec2-13-58-220-91.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.221.193",
    port: 4000,
    aws: "ec2-13-58-221-193.us-east-2.compute.amazonaws.com"
  },
{
    ip: "13.58.175.131",
    port: 4000,
    aws: "ec2-13-58-175-131.us-east-2.compute.amazonaws.com"
  },
{
    ip: "52.53.177.244",
    port: 4000,
    aws: "ec2-52-53-177-244.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.219.167.13",
    port: 4000,
    aws: "ec2-54-219-167-13.us-west-1.compute.amazonaws.com"
  },

{
    ip: "54.153.16.118",
    port: 4000,
    aws: "ec2-54-153-16-118.us-west-1.compute.amazonaws.com"
  },{
    ip: "54.215.146.2",
    port: 4000,
    aws: "ec2-54-215-146-2.us-west-1.compute.amazonaws.com"
  },

{
    ip: "54.193.77.165",
    port: 4000,
    aws: "ec2-54-193-77-165.us-west-1.compute.amazonaws.com"
  },
{
    ip: "54.187.2.164",
    port: 4000,
    aws: "ec2-54-187-2-164.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.209.151.250",
    port: 4000,
    aws: "ec2-34-209-151-250.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.211.44.30",
    port: 4000,
    aws: "ec2-34-211-44-30.us-west-2.compute.amazonaws.com"
  },
{
    ip: "34.211.46.96",
    port: 4000,
    aws: "ec2-34-211-46-96.us-west-2.compute.amazonaws.com"
  },
{
    ip: "54.202.68.204",
    port: 4000,
    aws: "ec2-54-202-68-204.us-west-2.compute.amazonaws.com"
  },
{
    ip: "35.182.23.198",
    port: 4000,
    aws: "ec2-35-182-23-198.ca-central-1.compute.amazonaws.com"
  },{
    ip: "52.60.225.73",
    port: 4000,
    aws: "ec2-52-60-225-73.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "52.60.222.47",
    port: 4000,
    aws: "ec2-52-60-222-47.ca-central-1.compute.amazonaws.com"
  },

{
    ip: "52.60.164.101",
    port: 4000,
    aws: "ec2-52-60-164-101.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "35.182.13.60",
    port: 4000,
    aws: "ec2-35-182-13-60.ca-central-1.compute.amazonaws.com"
  },
{
    ip: "34.253.181.52",
    port: 4000,
    aws: "ec2-34-253-181-52.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.154.52.224",
    port: 4000,
    aws: "ec2-54-154-52-224.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.194.126.232",
    port: 4000,
    aws: "ec2-54-194-126-232.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.246.187.20",
    port: 4000,
    aws: "ec2-54-246-187-20.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.77.251.239",
    port: 4000,
    aws: "ec2-54-77-251-239.eu-west-1.compute.amazonaws.com"
  },
{
    ip: "54.93.85.178",
    port: 4000,
    aws: "ec2-54-93-85-178.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "52.59.220.4",
    port: 4000,
    aws: "ec2-52-59-220-4.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.33.249",
    port: 4000,
    aws: "ec2-54-93-33-249.eu-central-1.compute.amazonaws.com"
  },{
    ip: "52.59.192.14",
    port: 4000,
    aws: "ec2-52-59-192-14.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.223.14",
    port: 4000,
    aws: "ec2-54-93-223-14.eu-central-1.compute.amazonaws.com"
  },

{
    ip: "52.59.242.251",
    port: 4000,
    aws: "ec2-52-59-242-251.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "52.59.238.170",
    port: 4000,
    aws: "ec2-52-59-238-170.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.185.138",
    port: 4000,
    aws: "ec2-54-93-185-138.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.40.230",
    port: 4000,
    aws: "ec2-54-93-40-230.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.197.134",
    port: 4000,
    aws: "ec2-54-93-197-134.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.66.55",
    port: 4000,
    aws: "ec2-54-93-66-55.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.111.125",
    port: 4000,
    aws: "ec2-54-93-111-125.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "35.158.121.214",
    port: 4000,
    aws: "ec2-35-158-121-214.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "35.158.125.242",
    port: 4000,
    aws: "ec2-35-158-125-242.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.225.141",
    port: 4000,
    aws: "ec2-54-93-225-141.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "52.59.246.242",
    port: 4000,
    aws: "ec2-52-59-246-242.eu-central-1.compute.amazonaws.com"
  },{
    ip: "52.59.255.126",
    port: 4000,
    aws: "ec2-52-59-255-126.eu-central-1.compute.amazonaws.com"
  },

{
    ip: "54.93.249.69",
    port: 4000,
    aws: "ec2-54-93-249-69.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "54.93.114.197",
    port: 4000,
    aws: "ec2-54-93-114-197.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "52.59.253.240",
    port: 4000,
    aws: "ec2-52-59-253-240.eu-central-1.compute.amazonaws.com"
  },
{
    ip: "13.126.14.240",
    port: 4000,
    aws: "ec2-13-126-14-240.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "13.126.15.102",
    port: 4000,
    aws: "ec2-13-126-15-102.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "52.66.188.114",
    port: 4000,
    aws: "ec2-52-66-188-114.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "35.154.61.167",
    port: 4000,
    aws: "ec2-35-154-61-167.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "52.66.140.164",
    port: 4000,
    aws: "ec2-52-66-140-164.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "52.66.64.51",
    port: 4000,
    aws: "ec2-52-66-64-51.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "13.126.16.197",
    port: 4000,
    aws: "ec2-13-126-16-197.ap-south-1.compute.amazonaws.com"
  },{
    ip: "35.154.59.104",
    port: 4000,
    aws: "ec2-35-154-59-104.ap-south-1.compute.amazonaws.com"
  },

{
    ip: "52.66.87.25",
    port: 4000,
    aws: "ec2-52-66-87-25.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "35.154.232.3",
    port: 4000,
    aws: "ec2-35-154-232-3.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "35.154.163.68",
    port: 4000,
    aws: "ec2-35-154-163-68.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "35.154.81.120",
    port: 4000,
    aws: "ec2-35-154-81-120.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "13.126.36.16",
    port: 4000,
    aws: "ec2-13-126-36-16.ap-south-1.compute.amazonaws.com"
  },
{
    ip: "52.66.176.112",
    port: 4000,
    aws: "ec2-52-66-176-112.ap-south-1.compute.amazonaws.com"
  }
];
//temporarily pre-configured: database, user, password
var config = {
    "port": 4000,
    "address": "127.0.0.1",
    "version": "0.3.0",
    "fileLogLevel": "info",
    "logFileName": "logs/ark.log",
    "consoleLogLevel": "debug",
    "trustProxy": false,
    "db": {
        "host": "localhost",
        "port": 5432,
        "database": "bpl_devnet",
        "user": "ubuntu",
        "password": "blockpool123",
        "poolSize": 20,
        "poolIdleTimeout": 30000,
        "reapIntervalMillis": 1000,
        "logEvents": [
            "error"
        ]
    },
    "api": {
        "mount": true,
        "access": {
            "whiteList": []
        },
        "options": {
            "limits": {
                "max": 0,
                "delayMs": 0,
                "delayAfter": 0,
                "windowMs": 60000
            }
        }
    },
    "peers": {
        "minimumNetworkReach":1,
        "list": [], //Since each IP was getting copied in the generated files, however we want only a single IP and that too of the current instance.
        "blackList": [],
        "options": {
            "limits": {
                "max": 0,
                "delayMs": 0,
                "delayAfter": 0,
                "windowMs": 60000
            },
            "maxUpdatePeers": 20,
            "timeout": 5000
        }
    },
    "forging": {
        "coldstart": 6,
        "force": true,
        "secret": [],
        "access": {
            "whiteList": [
                "127.0.0.1"
            ]
        }
    },
    "loading": {
        "verifyOnLoading": false,
        "loadPerIteration": 5000
    },
    "ssl": {
        "enabled": false,
        "options": {
            "port": 443,
            "address": "0.0.0.0",
            "key": "./ssl/ark.key",
            "cert": "./ssl/ark.crt"
        }
    },
    "network":"BPL"
};

//sets the networkVersion
//setting the network version inside node_modules/arkjs/lib/transactions/crypto.js
arkjs.crypto.setNetworkVersion(networks[config.network].pubKeyHash);
//console.log(networks[config.network]);
sign = function (block, keypair) {
	var hash = getHash(block);
	return ed.sign(hash, keypair).toString('hex');
};


getId = function (block) {
	var hash = crypto.createHash('sha256').update(getBytes(block)).digest();
	var temp = new Buffer(8);
	for (var i = 0; i < 8; i++) {
		temp[i] = hash[7 - i];
	}

	var id = bignum.fromBuffer(temp).toString();
	return id;
};

getHash = function (block) {
	return crypto.createHash('sha256').update(getBytes(block)).digest();
};


getBytes = function (block) {
	var size = 4 + 4 + 4 + 8 + 4 + 4 + 8 + 8 + 4 + 4 + 4 + 32 + 32 + 66;
	var b, i;

	try {
		var bb = new ByteBuffer(size, true);
		bb.writeInt(block.version);
		bb.writeInt(block.timestamp);
    bb.writeInt(block.height);

		if (block.previousBlock) {
			var pb = bignum(block.previousBlock).toBuffer({size: '8'});

			for (i = 0; i < 8; i++) {
				bb.writeByte(pb[i]);
			}
		} else {
			for (i = 0; i < 8; i++) {
				bb.writeByte(0);
			}
		}

		bb.writeInt(block.numberOfTransactions);
		bb.writeLong(block.totalAmount);
		bb.writeLong(block.totalFee);
		bb.writeLong(block.reward);

		bb.writeInt(block.payloadLength);

		var payloadHashBuffer = new Buffer(block.payloadHash, 'hex');
		for (i = 0; i < payloadHashBuffer.length; i++) {
			bb.writeByte(payloadHashBuffer[i]);
		}

		var generatorPublicKeyBuffer = new Buffer(block.generatorPublicKey, 'hex');
		for (i = 0; i < generatorPublicKeyBuffer.length; i++) {
			bb.writeByte(generatorPublicKeyBuffer[i]);
		}

		if (block.blockSignature) {
			var blockSignatureBuffer = new Buffer(block.blockSignature, 'hex');
			for (i = 0; i < blockSignatureBuffer.length; i++) {
				bb.writeByte(blockSignatureBuffer[i]);
			}
		}

		bb.flip();
		b = bb.toBuffer();
	} catch (e) {
		throw e;
	}

	return b;
};

create = function (data) {
	var transactions = data.transactions.sort(function compare(a, b) {
		if (a.type < b.type) { return -1; }
		if (a.type > b.type) { return 1; }
		if (a.amount < b.amount) { return -1; }
		if (a.amount > b.amount) { return 1; }
		return 0;
	});

	var nextHeight = 1;

	var reward = 0,
	    totalFee = 0, totalAmount = 0, size = 0;

	var blockTransactions = [];
	var payloadHash = crypto.createHash('sha256');

	for (var i = 0; i < transactions.length; i++) {
		var transaction = transactions[i];
		var bytes = arkjs.crypto.getBytes(transaction);

		size += bytes.length;

		totalFee += transaction.fee;
		totalAmount += transaction.amount;

		blockTransactions.push(transaction);
		payloadHash.update(bytes);
	}

	var block = {
		version: 0,
		totalAmount: totalAmount,
		totalFee: totalFee,
		reward: reward,
		payloadHash: payloadHash.digest().toString('hex'),
		timestamp: data.timestamp,
		numberOfTransactions: blockTransactions.length,
		payloadLength: size,
		previousBlock: null,
		generatorPublicKey: data.keypair.publicKey.toString('hex'),
		transactions: blockTransactions,
    height:1
	};

  block.id=getId(block);


	try {
		block.blockSignature = sign(block, data.keypair);
	} catch (e) {
		throw e;
	}

	return block;
}

var delegates = [];
var votes = [];
var transactions = [];

var genesis = {
  passphrase: bip39.generateMnemonic(),
  balance: 2500000000000000 //25 million tokens
}

var premine = {
  passphrase: bip39.generateMnemonic()
}

premine.publicKey = arkjs.crypto.getKeys(premine.passphrase).publicKey;
premine.address = arkjs.crypto.getAddress(premine.publicKey, networks[config.network].pubKeyHash);

genesis.publicKey = arkjs.crypto.getKeys(genesis.passphrase).publicKey;
genesis.address = arkjs.crypto.getAddress(genesis.publicKey, networks[config.network].pubKeyHash);
genesis.wif = arkjs.crypto.getKeys(genesis.passphrase).toWIF();

var premineTx = arkjs.transaction.createTransaction(genesis.address,genesis.balance,null, premine.passphrase)

premineTx.fee = 0;
premineTx.timestamp = 0;
premineTx.senderId = premine.address;
premineTx.signature = arkjs.crypto.sign(premineTx,arkjs.crypto.getKeys(genesis.passphrase));
premineTx.id = arkjs.crypto.getId(premineTx);

transactions.push(premineTx);

for(var i=1; i<136; i++){ //135 delegates
  var delegate = {
    'passphrase': bip39.generateMnemonic(),
    'username': "genesis_"+i
  };

  var createDelegateTx = arkjs.delegate.createDelegate(delegate.passphrase, delegate.username);
  createDelegateTx.fee = 0;
  createDelegateTx.timestamp = 0;
  createDelegateTx.senderId = genesis.address;
  createDelegateTx.signature = arkjs.crypto.sign(createDelegateTx,arkjs.crypto.getKeys(delegate.passphrase));
  createDelegateTx.id = arkjs.crypto.getId(createDelegateTx);


  delegate.publicKey = createDelegateTx.senderPublicKey;
  delegate.address = arkjs.crypto.getAddress(createDelegateTx.senderPublicKey, networks[config.network].pubKeyHash);

  votes.push("+"+delegate.publicKey)
  transactions.push(createDelegateTx);

  delegates.push(delegate);
}


var voteTransaction = arkjs.vote.createVote(genesis.passphrase,votes);
voteTransaction.fee = 0;
voteTransaction.timestamp = 0;
voteTransaction.senderId = genesis.address;
voteTransaction.signature = arkjs.crypto.sign(voteTransaction,arkjs.crypto.getKeys(genesis.passphrase));
voteTransaction.id = arkjs.crypto.getId(voteTransaction);

transactions.push(voteTransaction);


var genesisBlock = create({
  keypair: arkjs.crypto.getKeys(genesis.passphrase),
  transactions:transactions,
  timestamp:0
});

for(var i=0;i<135;i++){ //135 delegates
	config.forging.secret.push(delegates[i].passphrase);
}

/*Splits all delegates accross all seed_peers*/
for(var i=0;i<135;i++){
  var seed_index = i % seed_peers.length;
  if(!seed_peers[seed_index].secret){
    seed_peers[seed_index].secret = [];
  }
  seed_peers[seed_index].secret.push(delegates[i].passphrase);
}

/*
Generates the different config file for all peers that we have added in seed_peers.
*/
seed_peers.forEach(function(peer){
  config.forging.secret = peer.secret;
  
  //to customize the address and peers list field in config.json file , we have included the below piece of code
  config.address = peer.aws; // setting up Public DNS(IPv4) of AWS in the generated config file, to avoid manually entering the same.
  config.peers.list.pop();
  config.peers.list.push({ "ip": peer.ip, "port":config.port});
  fs.writeFile("private/config_files/config."+config.network+"."+peer.ip+".json", JSON.stringify(config, null, 2));
  });


config.nethash = genesisBlock.payloadHash;


fs.writeFile("private/genesisBlock.private.json",JSON.stringify(genesisBlock, null, 2));
fs.writeFile("private/config.private.json",JSON.stringify(config, null, 2));
fs.writeFile("private/delegatesPassphrases.private.json", JSON.stringify(delegates, null, 2));
fs.writeFile("private/genesisPassphrase.private.json", JSON.stringify(genesis, null, 2));
