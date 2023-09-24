import React from "react";

import GoogleMaps from "./GoogleMaps";
import Fabs from "./Fabs";
import Markers from "./Markers";

const Map: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
        <GoogleMaps />
      </div>
      <Fabs />
      <Markers />
    </>
  );
};

export default Map;
