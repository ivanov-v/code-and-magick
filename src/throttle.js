'use strict';

var throttle = function(func, time) {
  var timerId = 0;

  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(func, time);
  };
};

module.exports = throttle;
