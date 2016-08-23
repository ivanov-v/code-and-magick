'use strict';

window.getData = function(data) {
  window.reviews = data;
};

var load = function(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
};

module.exports = load;
