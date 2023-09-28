import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: [] as google.maps.Marker[],
};

export const setLatLngs = (
  latLngs: { latitude: number; longitude: number }[],
): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const positions = latLngs.map(
    ({ latitude, longitude }) => new google.maps.LatLng(latitude, longitude),
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
