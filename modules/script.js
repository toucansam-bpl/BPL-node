// Constructor
function Script (cb, scope) {
	library = scope;
	self = this;
	return cb(null, self);
}


Script.prototype.onBind = function (scope) {
	modules = scope;
};
// Export
module.exports = Script;
