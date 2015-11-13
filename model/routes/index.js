import greetings from './greeting.js';

module.exports.load = function() {
  return [].concat(
    greetings
  );
};