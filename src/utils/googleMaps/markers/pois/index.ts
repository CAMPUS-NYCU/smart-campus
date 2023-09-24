import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: [] as google.maps.Marker[],
};

export const setPois = (
  pois: { latitude: number; longitude: number }[],
): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const positions = pois.map(
    (poi) => new google.maps.LatLng(poi.latitude, poi.longitude),
  );

  const markers = positions.map((position) => {
    return new google.maps.Marker({
      icon: getIcon(),
      map: maps.mapRef.current,
      position,
      title: "User POI",
    });
  });

  markerRef.current = markers;
};

export const clear = (): void => {
  markerRef.current.forEach((marker) => {
    marker.setMap(null);
  });

  markerRef.current = [];
};
