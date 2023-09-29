import React from "react";

import { markers } from "../../../../utils/googleMaps";
import { useGetPoisQuery } from "../../../../api/poi";

const PoiMarkers: React.FC = () => {
  const { data: pois } = useGetPoisQuery();

  React.useEffect(() => {
    if (pois) {
      markers.poi.setPois(pois);
    }

    return () => {
      markers.poi.clear();
    };
  }, [pois]);
  return <></>;
};

export default PoiMarkers;
