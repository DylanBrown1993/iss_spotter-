const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    } catch (parseError) {
      callback(parseError.message, null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMessage = `Status Code ${response.statusCode} when fetching IP coordinates. Response: ${body}`;
      callback(new Error(errorMessage), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const latitude = data.latitude;
      const longitude = data.longitude;
      const coordinates = { latitude, longitude };
      callback(null, coordinates);
    } catch (parseError) {
      callback(parseError.message, null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMessage = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(new Error(errorMessage), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const flyOverTimes = data.response;
      callback(null, flyOverTimes);
    } catch (parseError) {
      callback(parseError.message, null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };


