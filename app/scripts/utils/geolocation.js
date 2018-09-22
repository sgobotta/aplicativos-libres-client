
const utils = {};

const data = {
  perezH: {
    latitude: '-34.7186388',
    longitude: '-58.2588029',
  },
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const result = getDistanceFromLatLonInKm(lat1, lon1, data.perezH.latitude, data.perezH.longitude);
  return result;
}

utils.getDistance = (lat1, lon1, lat2, lon2) => calculateDistance(lat1, lon1, lat2, lon2);

export const GeoUtils = utils;
