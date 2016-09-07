'use strict';

module.exports = function(list, filterID) {
  var newList;
  switch (filterID) {
    case 'reviews-all':
      newList = list;
      break;
    case 'reviews-recent':
      newList = list.sort(function(elem) {
        
      });
      break;
  }

  return newList;
};
