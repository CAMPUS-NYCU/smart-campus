import { EntryData } from "../../../../models/entry";
import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: {} as Record<string, google.maps.Marker>,
};

export const setEntries = (entries: EntryData): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const marker: [string, google.maps.Marker] = [
    entries.name,
    new google.maps.Marker({
      icon: getIcon(),
      map: maps.mapRef.current,
      position: new google.maps.LatLng(
        entries.latlng.latitude,
        entries.latlng.longitude,
      ),
      zIndex: 2,
    }),
  ];

  markerRef.current = Object.fromEntries([marker]);
};

export const clear = (): void => {
  Object.values(markerRef.current).forEach((marker) => marker.setMap(null));

  markerRef.current = {};
};
