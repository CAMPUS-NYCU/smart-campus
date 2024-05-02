import Poi from "../models/poi";

function calculateDistance(
  latlng1: { latitude: number; longitude: number },
  latlng2: { latitude: number; longitude: number },
) {
  const R = 6371e3;
  const phi1 = (latlng1.latitude * Math.PI) / 180;
  const phi2 = (latlng2.latitude * Math.PI) / 180;
  const deltaPhi = ((latlng2.latitude - latlng1.latitude) * Math.PI) / 180;
  const deltaLambda = ((latlng2.longitude - latlng1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}

function compareByUpdatedTime(poi1: Poi, poi2: Poi) {
  const lastestTime1 = poi1.data.updatedAt || poi1.data.createdAt;
  const lastestTime2 = poi2.data.updatedAt || poi2.data.createdAt;

  return new Date(lastestTime2).getTime() - new Date(lastestTime1).getTime();
}

const compareByTargetSerial = (a: Poi, b: Poi): number => {
  const serialA = a.data.target.serial;
  const serialB = b.data.target.serial;

  if (serialA < serialB) {
    return -1;
  }
  if (serialA > serialB) {
    return 1;
  }
  return 0;
};

export { calculateDistance, compareByUpdatedTime, compareByTargetSerial };
