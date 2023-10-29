import { Pois } from "../../../../models/poi";

import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: {} as Record<string, google.maps.Marker>,
};

export const setPois = (pois: Pois): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const markers = Object.fromEntries(
    Object.entries(pois).map(([poiId, poiData]) => [
      poiId,
      new google.maps.Marker({
        icon: getIcon(poiData.status),
        map: maps.mapRef.current,
        position: new google.maps.LatLng(
          poiData.latlng.latitude,
          poiData.latlng.longitude,
        ),
      }),
    ]),
  );

  markerRef.current = markers;
};

export const setOnPoiMarkerClick = (onClick: (poiId: string) => void): void => {
  Object.entries(markerRef.current).forEach(([poiId, marker]) => {
    marker.addListener("click", () => onClick(poiId));
  });
};

export const clear = (): void => {
  Object.values(markerRef.current).forEach((marker) => marker.setMap(null));

  markerRef.current = {};
};
