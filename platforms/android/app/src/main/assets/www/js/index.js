/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
//  */

// function goHome() {	
// 	var http = new XMLHttpRequest();

// 	http.open("GET","index.html",false); // REPLACE INDEX.JSP WITH NEW URL
// 	http.send();

// 	if(http.status == 200) {
//     console.log('were going home ')
//     let meta = document.querySelector('meta[name="refresh"]')
//     meta.parentNode.removeChild(meta);
// 	} else {
//     console.log("The server is currently down at the moment, retrying in 5 seconds.")
//     location.reload;
// 		setTimeout(goHome, 5000);
// 	}
// }
let iframe  = document.createElement('iframe');
iframe.setAttribute('src','http://devsrv86a/pricecheck/index.html?storeid=511&brand=shop-rite&mwgStoreId=070C334')
function doesConnectionExist() {
  var xhr = new XMLHttpRequest();
  var file = "http://kiosk.wakefern.com/kioskandroid";
  var randomNum = Math.round(Math.random() * 10000);

  xhr.open('HEAD', file + "?rand=" + randomNum, true);
  xhr.send();
   
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 304) {
        alert("connection exists!");

    // iframe.setAttribute('src','http://devsrv86a.wakefern.com/pricechecker/#/')
            document.body.appendChild(iframe);

      } else {
        alert("connection doesn't exist!");
        setTimeout(doesConnectionExist, 5000)
      }
    }
  }
}



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // inAppBrowserRef = cordova.InAppBrowser.open('https://deliorder.shoprite.com', '_blank', 'location=no,clearsessioncache=yes');
        // let script = 'alert("fuck you")'
        // inAppBrowserRef.addEventListener('loadstop', function() {
        //      inAppBrowserRef.executeScript({code: script});
        //  });
        doesConnectionExist();

      },

    // Update DOM on a Received Event

    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');
    }
};

app.initialize();
setTimeout(function(){
    // alert('plugin loaded', HedcPlugin)
    console.log('plugin loaded', HedcPlugin)

      var success = function(message) {
        alert("javascriptside: " + message);
        console.log("javascriptside: " + message);

        console.log('iframe.contentWindow.postMessage(message, )',iframe.contentWindow.postMessage('4011', 'http://devsrv86a/pricecheck/index.hml?storeid=511&brand=shop-rite&mwgStoreId=070C334'))
        alert('iframe.contentWindow.postMessage(message, )',iframe.contentWindow.postMessage('4011', 'http://devsrv86a/pricecheck/index.hml?storeid=511&brand=shop-rite&mwgStoreId=070C334'))
        iframe.contentWindow.postMessage(message, 'http://devsrv86a/pricecheck/index.html?storeid=511&brand=shop-rite&mwgStoreId=070C334');
      }
      
      var failure = function(error) {
        // alert("Callback sent failed");
        console.log("Callback sent failed",error);
      }
      
      HedcPlugin.sendWrappedCommand('defalt', success, failure)
    },5000)

