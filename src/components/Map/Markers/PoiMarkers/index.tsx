import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetPoisQuery } from "../../../../api/poi";
import { routeParams, routeParamsKeys } from "../../../../models/route";
import { markers } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";

const PoiMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: pois } = useGetPoisQuery();

  const handleClick = React.useCallback(
    (poiId: string) => {
      searchParams.set(routeParamsKeys.markerType, routeParams.markerType.poi);
      searchParams.set(routeParamsKeys.markerId, poiId);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    if (pois) {
      markers.poi.setPois(pois);
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [pois, handleClick]);
  return <></>;
};

export default PoiMarkers;
