import React from "react";

import GoogleMaps from "./GoogleMaps";
import Pois from "./Pois";

const Map: React.FC = () => {
  return (
    <>
      <GoogleMaps />
      <Pois />
    </>
  );
};

export default Map;
