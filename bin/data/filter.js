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
      newList = list.filter(function(item) {
        return item.rating >= 3;
      });
      newList.sort(function(a, b) {
        return b.rating - a.rating;
      });
      return newList;

    case 'reviews-bad':
      newList = list.filter(function(item) {
        return item.rating < 3;
      });
      newList.sort(function(a, b) {
        return a.rating - b.rating;
      });
      return newList;

    case 'reviews-popular':
      list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      return list;

    default:
      return list;
  }
};
