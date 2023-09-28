import React from "react";

import { markers } from "../../../../utils/googleMaps";
import { useGetPoisQuery } from "../../../../api/poi";

const Poi: React.FC = () => {
  const { data: pois } = useGetPoisQuery();

  React.useEffect(() => {
    const latLngs = (pois || []).map((poi) => ({
      latitude: poi.latlng.latitude,
      longitude: poi.latlng.longitude,
    }));
    markers.poi.setLatLngs(latLngs);

    return () => {
      markers.poi.clear();
    };
  }, [pois]);
  return <></>;
};

export default Poi;
