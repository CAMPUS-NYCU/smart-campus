function calculateDistance(
  latlng1: { latitude: number; longitude: number },
  latlng2: { latitude: number; longitude: number },
) {
  const R = 6371e3; // metres
  const φ1 = (latlng1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (latlng2.latitude * Math.PI) / 180;
  const Δφ = ((latlng2.latitude - latlng1.latitude) * Math.PI) / 180;
  const Δλ = ((latlng2.longitude - latlng1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

export { calculateDistance };
