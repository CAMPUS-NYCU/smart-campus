import React from "react";
import { useDispatch } from "react-redux";

import { useGetPoisQuery } from "../../../../api/poi";
import { markers } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { setCurrentPoiId } from "../../../../store/poiModal";

const PoiMarkers: React.FC = () => {
  const dispatch = useDispatch();

  const { data: pois } = useGetPoisQuery();

  const handlePoiMarkerClick = React.useCallback(
    (poiId: string) => {
      dispatch(setCurrentPoiId(poiId));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (pois) {
      markers.poi.setPois(pois);
      setOnPoiMarkerClick(handlePoiMarkerClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [handlePoiMarkerClick, pois]);
  return <></>;
};

export default PoiMarkers;
