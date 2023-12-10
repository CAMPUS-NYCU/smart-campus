import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useGetPoiQuery, useGetPoisQuery } from "../../../../api/poi";
import { IRootState } from "../../../../store";
import { setHighlightId } from "../../../../store/poi";
import { markers } from "../../../../utils/googleMaps";
import { maps } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { getParamsFromDrawer } from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams] = useSearchParams();

  const highlightId = useSelector((state: IRootState) => state.poi.highlightId);

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: pois } = useGetPoisQuery(clusterId);

  const poiId = getParamsFromDrawer("poi", searchParams).poiId;
  const { data: poi } = useGetPoiQuery(poiId);

  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (poiId: string) => dispatch(setHighlightId(poiId)),
    [dispatch],
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

  React.useEffect(() => {
    if (highlightId && pois && pois[highlightId]) {
      const { latitude, longitude } = pois[highlightId].latlng;
      const north = maps.getBounds()?.getNorthEast().lat();
      const south = maps.getBounds()?.getSouthWest().lat();
      maps.panTo(
        north && south ? latitude - (north - south) / 4 : latitude,
        longitude,
      );
    }
  }, [highlightId, pois]);
  return <></>;
};

export default PoiMarkers;
