const { fetchMyIP, nextISSTimesForMyLocation, printPassTimes } = require('./iss_promised');
const request = require('request-promise-native');

fetchMyIP()
  .then(body => console.log(body));

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body))
  nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })

module.exports = { fetchCoordsByIP };
    