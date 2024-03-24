import React from "react";

import ClusterMarkers from "./ClusterMarkers";
import FacilityMarkers from "./FacilityMarkers";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";

const Markers: React.FC = () => {
  return (
    <>
      <ClusterMarkers />
      <FacilityMarkers />
      <PoiMarkers />
      <UserMarker />
    </>
  );
};

export default Markers;
