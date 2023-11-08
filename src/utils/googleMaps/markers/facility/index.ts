import { Facilities } from "../../../../models/facility";

import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: {} as Record<string, google.maps.Marker>,
};

export const setFacilities = (facilities: Facilities): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const markers = Object.fromEntries(
    Object.entries(facilities).map(([key, FacilityData]) => [
      key,
      new google.maps.Marker({
        icon: getIcon(),
        label: {
          text: FacilityData.target.description,
          fontFamily: "'Helvetica', 'Arial', 'sans-serif'",
          fontSize: "14px",
          color: "#97948E",
        },
        map: maps.mapRef.current,
        position: new google.maps.LatLng(
          FacilityData.latlng.latitude,
          FacilityData.latlng.longitude,
        ),
        zIndex: 2,
      }),
    ]),
  );

  markerRef.current = markers;
};

export const clear = (): void => {
  Object.values(markerRef.current).forEach((marker) => marker.setMap(null));

  markerRef.current = {};
};
