

app.initialize();

setTimeout(() => {
    var myButton = document.getElementById("myButton").addEventListener("click", send);
    console.log(myButton)

}, 5000);

function send() {
    console.log('send me')
    var textValue = document.getElementById("myText").value;
    alert(textValue, 'text value is such')

    var success = function(message) {
    	console.log("javascriptside: " + message);
    }

    var failure = function() {
    	console.log("Callback sent failed");
    }

    HedcPlugin.sendWrappedCommand(textValue, success, failure);
}

function onDeviceReady() {
     // console.log("Device ready");
}
document.addEventListener("deviceready", onDeviceReady, false);