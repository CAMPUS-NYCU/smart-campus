export const getUserMarker = (
  map?: google.maps.Map | google.maps.StreetViewPanorama | null | undefined,
  position?: google.maps.LatLngLiteral | google.maps.LatLng | null | undefined,
): google.maps.Marker => {
  return new google.maps.Marker({
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      fillColor: "#3b82f6",
      fillOpacity: 1,
      strokeColor: "#3b82f6",
      strokeOpacity: 0.3,
      strokeWeight: 12,
    },
    position,
    map,
    title: "User POI",
  });
};
