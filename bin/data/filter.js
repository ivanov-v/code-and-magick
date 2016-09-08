'use strict';

module.exports = function(list, filterID) {
  var newList;
  switch (filterID) {
    case 'reviews-all':
      newList = list;
      break;
    case 'reviews-recent':
      newList = list.sort(function(a, b) {
        return b - a;
      });
      break;
    default:
      return list;
  }

  return newList;
};
