import { Clusters } from "../../../../models/cluster";

import { maps } from "../..";
import { getIcon } from "./icons";

export const markerRef = {
  current: {} as Record<string, google.maps.Marker>,
};

export const setClusters = (clusters: Clusters): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const markers = Object.fromEntries(
    Object.entries(clusters).map(([clusterId, clusterData]) => [
      clusterId,
      new google.maps.Marker({
        icon: getIcon(),
        label: {
          text: clusterData.name,
          fontFamily: "'Helvetica', 'Arial', 'sans-serif'",
          fontSize: "12px",
          color: "#FDCC4F",
        },
        map: maps.mapRef.current,
        position: new google.maps.LatLng(
          clusterData.latlng.latitude,
          clusterData.latlng.longitude,
        ),
      }),
    ]),
  );

  markerRef.current = markers;
};

export const setOnClusterMarkerClick = (
  onClick: (clusterId: string) => void,
): void => {
  Object.entries(markerRef.current).forEach(([clusterId, marker]) => {
    marker.addListener("click", () => onClick(clusterId));
  });
};

export const clear = (): void => {
  Object.values(markerRef.current).forEach((marker) => marker.setMap(null));

  markerRef.current = {};
};
