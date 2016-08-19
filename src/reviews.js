'use strict';

var reviews;

window.getData = function(data) {
  reviews = data;
};

var parseData = function(loadedData) {
  loadedData.forEach(function(item) {
    console.log(item.author.name);
  });
};

var addScript = function(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
};

addScript('http://localhost:1506/api/reviews?callback=getData', function() {
  parseData(reviews);
});
