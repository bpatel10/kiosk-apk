cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/src/browser/InAppBrowserProxy.js",
        "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
        "pluginId": "cordova-plugin-inappbrowser",
        "runs": true
    },
    {
        "file": "plugins/com.opticalphusion.android.hedcplugin/www/HedcPlugin.js",
        "id": "com.opticalphusion.android.hedcplugin.HedcPlugin",
        "pluginId": "com.opticalphusion.android.hedcplugin",
        "clobbers": [
            "HedcPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-inappbrowser": "3.2.0",
    "cordova-plugin-whitelist": "1.3.4",
    "com.opticalphusion.android.hedcplugin": "1.0.0"
}
// BOTTOM OF METADATA
});