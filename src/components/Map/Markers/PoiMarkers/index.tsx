import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetPoiQuery, useGetPoisQuery } from "../../../../api/poi";
import { markers } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import {
  getParamsFromDrawer,
  setupDrawerParams,
} from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: pois } = useGetPoisQuery(clusterId);

  const poiId = getParamsFromDrawer("poi", searchParams).poiId;
  const { data: poi } = useGetPoiQuery(poiId);

  const handleClick = React.useCallback(
    (poiId: string) =>
      setupDrawerParams<"poi">({ poiId }, searchParams, setSearchParams),
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    if (pois && Object.keys(pois).length !== 0) {
      markers.poi.setPois(pois);
      setOnPoiMarkerClick(handleClick);
    } else if (poi) {
      markers.poi.setPois({ [poi.id]: poi.data });
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [poi, pois, handleClick]);
  return <></>;
};

export default PoiMarkers;
