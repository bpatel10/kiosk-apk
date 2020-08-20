cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "com.opticalphusion.android.hedcplugin.HedcPlugin",
      "file": "plugins/com.opticalphusion.android.hedcplugin/www/HedcPlugin.js",
      "pluginId": "com.opticalphusion.android.hedcplugin",
      "clobbers": [
        "HedcPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-inappbrowser": "3.2.0",
    "com.opticalphusion.android.hedcplugin": "1.0.0"
  };
});