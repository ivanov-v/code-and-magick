'use strict';

var nodesEach = function(elements, callback) {
  Array.prototype.forEach.call(elements, callback);
};

module.exports = nodesEach;
