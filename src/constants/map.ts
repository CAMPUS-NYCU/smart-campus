function calculateDistance(
  latlng1: { latitude: number; longitude: number },
  latlng2: { latitude: number; longitude: number },
) {
  const R = 6371e3; // metres
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

  const d = R * c; // in metres
  return d;
}

export { calculateDistance };
