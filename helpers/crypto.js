'use strict';

var constants = require('../constants.json');
var networks = require('../networks.json');
var config = require('../'+process.env.CONFIG_NAME);
var bpljs = require('bpljs');
bpljs = new bpljs.BplClass({
	"delegates": constants.activeDelegates,
  "epochTime": constants.epochTime,
  "interval": constants.blocktime,
  "network": networks[config.network]
});

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
