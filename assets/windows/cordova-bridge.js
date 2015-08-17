cordova.define.remove('cordova/exec');
cordova.define("cordova/exec", function (require, exports, module) {

  module.exports = function (completeCallback, failureCallback, service, action, args) {
    var success, fail;

    var command = 'http://.cordova/exec?service=' + service + '&action=' + action + '&args=' + encodeURIComponent(JSON.stringify(args));
    var callbackId = service + cordova.callbackId++;

    if (typeof completeCallback === "function") {
      success = function (args) {
        var result = JSON.parse(decodeURIComponent(args));
        completeCallback(result);
      };
    }

    if (typeof failureCallback === "function") {
      fail = function (args) {
        var err = JSON.parse(decodeURIComponent(args));
        failureCallback(err);
      };
    }

    if (success || fail) {
      cordova.callbacks[callbackId] = { success: success, fail: fail };
      command += '&callbackId=' + encodeURIComponent(callbackId);
    }

    window.location.href = command;
  };
});
