'use strict';

var load = function(url, config, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    callback(evt);
  };

  xhr.open(
    'GET', url +
    '?from=' + (config.from || 0) +
    '&to=' + (config.to || Infinity) +
    '&filter=' + (config.filter || 'default')
  );
  xhr.send();
};

module.exports = load;
