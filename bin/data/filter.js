'use strict';

var newList;

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      return list;

    case 'reviews-recent':
      newList = list.sort(function(a, b) {
        return b.created - a.created;
      });
      return newList;

    case 'reviews-good':
      list.sort(function(a, b) {
        return b.rating - a.rating;
      });
      newList = list.filter(function(item) {
        return item.rating >= 3;
      });
      return newList;

    default:
      return list;
  }
};
