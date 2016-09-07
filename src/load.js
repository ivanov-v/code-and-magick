'use strict';

var load = function(url, config, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onerror = function() {
    console.log('error');
  };

  xhr.open(
    'GET', url +
    '?from=' + (config.from || 0) +
    '&to=' + (config.to || Infinity) +
    '&filter=' + (config.filter || 'default')
  );

  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) {
      return;
    }

    if (this.status !== 200) {
      console.log('error');
      return;
    }

    if (callback) {
      callback(JSON.parse(xhr.response));
    }
  };
};

module.exports = load;
