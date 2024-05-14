import { UIPois, UIPoiData } from "../../../../models/uiPoi";

import { maps } from "../..";
import { getIcon, getHighlightedIcon } from "./icons";

export const markerRef = {
  current: {} as Record<string, google.maps.Marker>,
};

export const setPois = (pois: UIPois): void => {
  if (!maps.mapRef.current) {
    return;
  }

  const markers = Object.fromEntries(
    Object.entries(pois).map(([poiId, poiData]) => [
      poiId,
      new google.maps.Marker({
        icon: getIcon(poiData.target.name),
        map: maps.mapRef.current,
        position: new google.maps.LatLng(
          poiData.latlng.latitude,
          poiData.latlng.longitude,
        ),
        visible: poiData.isVisible,
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

export const toggleHighlightIcon = (
  highlightedId: string,
  targetName: UIPoiData["target"]["name"],
  isHighlighted: boolean,
): void => {
  if (isHighlighted) {
    markerRef.current[highlightedId].setIcon(getHighlightedIcon(targetName));
  } else {
    markerRef.current[highlightedId].setIcon(getIcon(targetName));
  }
};

export const toggleVisibilityIcon = (recommandArray: string[]) => {
  recommandArray.forEach((poiId) => {
    if (!markerRef.current[poiId]) {
      return;
    }
    markerRef.current[poiId].setVisible(true);
  });
};

export const toggleVisibilityIconAll = () => {
  Object.entries(markerRef.current).forEach(([, marker]) => {
    marker.setVisible(true);
  });
};

export const toggleVisibilityIconNone = () => {
  Object.entries(markerRef.current).forEach(([, marker]) => {
    marker.setVisible(false);
  });
};
