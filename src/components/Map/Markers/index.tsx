import React from "react";

import ClusterMarkers from "./ClusterMarkers";
import FacilityMarkers from "./FacilityMarkers";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";
import FacilityMarker from "./FacilityMarkers";

const Markers: React.FC = () => {
  return (
    <>
      <ClusterMarkers />
      <FacilityMarkers />
      <PoiMarkers />
      <FacilityMarker />
      <UserMarker />
    </>
  );
};

export default Markers;
