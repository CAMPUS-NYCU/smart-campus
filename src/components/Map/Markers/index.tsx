import React from "react";

import ClusterMarkers from "./ClusterMarkers";
import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";

const Markers: React.FC = () => {
  return (
    <>
      <ClusterMarkers />
      <PoiMarkers />
      <UserMarker />
    </>
  );
};

export default Markers;
