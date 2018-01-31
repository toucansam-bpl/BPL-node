'use strict';

var constants = require('../constants.json');
// Bpljs class - passing parameters
// var bpl = require('bpljs');
// var bpljs = new bpl.BplClass({'interval': constants.blocktime,
// 	'delegates': constants.activeDelegates,
// 	'networkVersion': constants.networkVersion});

// Bpljs class - default parameters
// var bpl = require('bpljs');
// var bpljs = new bpl.BplClass();

// Bpljs backward compatibility
var bpljs = require('bpljs');


var network = bpljs.networks.bpl;
var ed = {};

ed.makeKeypair = function (seed) {
	return bpljs.crypto.getKeys(seed);
};

ed.sign = function (hash, keypair) {
	return keypair.sign(hash).toDER().toString("hex");
};

ed.verify = function (hash, signatureBuffer, publicKeyBuffer) {
	try {
		var ecsignature = bpljs.ECSignature.fromDER(signatureBuffer);
		var ecpair = bpljs.ECPair.fromPublicKeyBuffer(publicKeyBuffer, network);
		return ecpair.verify(hash, ecsignature);
	} catch (error){
		return false;
	}
};

module.exports = ed;
