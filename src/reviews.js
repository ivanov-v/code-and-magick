'use strict';

var reviews;

window.getData = function(data) {
  reviews = data;
};

var addScript = function(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
};

var parseData = function(loadedData) {
  loadedData.forEach(function(item) {
    console.log(item.author.name);
  });
};

var hideFilters = function() {
  document.querySelector('.reviews-filter').classList.add('invisible');
};

addScript('http://localhost:1506/api/reviews?callback=getData', function() {
  parseData(reviews);
});

hideFilters();
