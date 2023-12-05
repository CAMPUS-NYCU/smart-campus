import React from "react";

import { markers } from "../../../utils/googleMaps";
import { maps } from "../../../utils/googleMaps";

const CreatingFlagMarker: React.FC = () => {
  const center = maps.getCenter();

  React.useEffect(() => {
    if (center !== null && center !== undefined) {
      markers.creatingFlag.setLatLng(center?.lat(), center?.lng());
    }
  }, [center]);

  return <></>;
};

export default CreatingFlagMarker;
