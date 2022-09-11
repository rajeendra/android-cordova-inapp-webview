cordova.define("cordova-plugin-hybrid.HybridBridge", function(require, exports, module) {
var exec = require('cordova/exec'),
    cordova = require('cordova');

function HybridBridge() {

}
HybridBridge.prototype.addItem = function(item, classname, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HybridBridge", "addItem", [item, classname]);
};
HybridBridge.prototype.preLogin = function(item, classname, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HybridBridge", "preLogin", [item, classname]);
};
HybridBridge.prototype.postLogin = function(item, classname, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HybridBridge", "postLogin", [item, classname]);
};
HybridBridge.prototype.showWebview = function(item, classname, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HybridBridge", "showWebview", [item, classname]);
};
module.exports = new HybridBridge();



});
