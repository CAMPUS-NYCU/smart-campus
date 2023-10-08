import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetPoisQuery } from "../../../../api/poi";
import { markers } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { setupDrawerParams } from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: pois } = useGetPoisQuery();

  const handleClick = React.useCallback(
    (poiId: string) =>
      setupDrawerParams<"poi">({ poiId }, searchParams, setSearchParams),
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
