cordova.define("com.opticalphusion.android.hedcplugin.HedcPlugin", function(require, exports, module) { var exec = require('cordova/exec');

function HedcPlugin() { 
	console.log("HedcPlugin.js: is created");
}

HedcPlugin.prototype.sendWrappedCommand = function(aString, successCallback, errorCallback) {
	console.log("HedcPlugin.js: sendWrappedCommand");

 	exec(successCallback, errorCallback, "HedcPlugin", aString,[]);
}

 var hedcPlugin = new HedcPlugin();
 module.exports = hedcPlugin;

});
