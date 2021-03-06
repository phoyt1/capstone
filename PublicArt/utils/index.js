const utils = {};

utils.getDistanceInMeters = (poi, coords) => {
    let lat2 = +poi.lat;
    let long2 = +poi.lng;
    let lat1 = +coords.latitude;
    let long1 = +coords.longitude;
    // haversine
    let R = 6371 // radius of eath in KM
    let dLat = (lat2 - lat1) * (Math.PI / 180);
    let dLng = (long2 - long1) * (Math.PI / 180);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d * 1000; // Meters
}

// this returns the relative direction of the POI - for example, if user is facing south
// but the attraction is due north, then this will return 180

utils.getDirection = (poi, coords) => {
    let lat2 = +poi.lat;
    let long2 = +poi.lng;
    let lat1 = +coords.latitude;
    let long1 = +coords.longitude;
    let theta = Math.atan2(lat2 - lat1, long2 - long1);
    if (theta < 0){
        theta += (2 * (Math.PI))
    }
    theta =  theta * (180 / Math.PI);
    return theta;
}
//this converts the direction theta into a number between -180 and 180
// such that an object at 0 is directly in front of the user, 90 to the right, etc.
utils.convertToOrientation = (userDirection, thetaDirection) => {
  let relDiff;
  const absDiff = Math.max((thetaDirection - userDirection), (userDirection - thetaDirection));
  switch (true) {
    case (userDirection > thetaDirection) && (absDiff > 180):
      relDiff = 360 - absDiff;
    break;
    case (userDirection > thetaDirection) && (absDiff < 180):
      relDiff = -(absDiff % 360);
    break;
    case (thetaDirection > userDirection) && (absDiff > 180):
      relDiff = absDiff - 360;
    break;
    case (thetaDirection > userDirection) && (absDiff < 180):
      relDiff = absDiff % 360;
    break;
    default:
      relDiff = absDiff;
    }
  return relDiff;
};

utils.getRelativePos = (poi, heading, coords) => {
    return {
        poi,
        distance: utils.getDistanceInMeters(poi, coords),
        dir: utils.convertToOrientation(heading, utils.getDirection(poi, coords))
    };
}

export default utils;