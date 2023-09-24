import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: null as google.maps.Marker | null,
};

export const setLatLng = (latitude: number, longitude: number): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const position = new google.maps.LatLng(latitude, longitude);

  if (!markerRef.current) {
    const marker = new google.maps.Marker({
      icon: getIcon(),
      map: maps.mapRef.current,
      position,
      title: "User POI",
    });

    markerRef.current = marker;
    return;
  }

  markerRef.current.setPosition(position);
};

export const clear = (): void => {
  markerRef.current?.setMap(null);
  markerRef.current = null;
};
