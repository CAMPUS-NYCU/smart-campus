import React from "react";

import ClusterMarkers from "./ClusterMarkers";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";
import FacilityMarker from "./FacilityMarkers";

const Markers: React.FC = () => {
  return (
    <>
      <ClusterMarkers />
      <PoiMarkers />
      <FacilityMarker />
      <UserMarker />
    </>
  );
};

export default Markers;
