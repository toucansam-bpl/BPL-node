'use strict';

var constants = require('../constants.json');
var Bpljs = require('bpljs');
var bpljs = new Bpljs({'interval': constants.blocktime,
	'delegates': constants.activeDelegates,
	'networkVersion': constants.networkVersion});
	
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
