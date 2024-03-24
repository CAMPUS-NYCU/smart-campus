import React from "react";

import PoiMarkers from "./PoiMarkers";
import UserMarker from "./UserMarker";

const Markers: React.FC = () => {
  return (
    <>
      <PoiMarkers />
      <UserMarker />
    </>
  );
};

export default Markers;
