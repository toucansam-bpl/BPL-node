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

function Crypto(scope){
	this.scope = scope;
	this.network = scope.config.network;
}

Crypto.prototype.makeKeypair = function (seed) {
	return bpljs.crypto.getKeys(seed, this.network);
};

Crypto.prototype.sign = function (hash, keypair) {
	return keypair.sign(hash).toDER().toString("hex");
};

Crypto.prototype.verify = function (hash, signatureBuffer, publicKeyBuffer) {
	try {
		var ecsignature = bpljs.ECSignature.fromDER(signatureBuffer);
		var ecpair = bpljs.ECPair.fromPublicKeyBuffer(publicKeyBuffer, this.network);
		return ecpair.verify(hash, ecsignature);
	} catch (error){
		return false;
	}
};

module.exports = Crypto;
