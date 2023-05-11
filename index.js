const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss')

const coords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Flyover Times:', flyOverTimes);
  }
});

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('192.168.0.1', (error, data) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Coordinates:', data);
  }
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  for (const pass of passTimes) {
    const datetime = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
});