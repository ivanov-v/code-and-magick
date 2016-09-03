'use strict';

const getPage = require('./get-page');
const filter = require('./filter');
const fs = require('fs');
const path = require('path');


const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000;

const getRandTimestampInRange = (range) => {
  return Date.now() - parseInt(Math.random() * range);
};

const preprocessRec = (timestamp, rec) => {
  return Object.assign({}, {
    created: timestamp
  }, rec);
};


module.exports = {
  read: (filterID, from, to) => {
    from = typeof from === 'undefined' ? -Infinity : from;
    to = typeof to === 'undefined' ? Infinity : to;

    let fileContent = fs.readFileSync(path.resolve(__dirname, 'reviews.json'), 'utf-8');
    let data = JSON.parse(fileContent);

    let preprocessedData = data.map(rec => preprocessRec(
        getRandTimestampInRange(twoWeeks),
        rec));

    return new Promise((resolve, reject) => {
      try {
        resolve(getPage(filter(preprocessedData, filterID), from, to));
      } catch(err) {
        reject(err);
      }
    });
  }
};
