import React from "react";

import GoogleMaps from "./GoogleMaps";
import Fabs from "./Fabs";
import Pois from "./Pois";

const Map: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
        <GoogleMaps />
      </div>
      <Fabs />
      <Pois />
    </>
  );
};

export default Map;
