import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useGetPoisQuery } from "../../../../api/poi";
import { IRootState } from "../../../../store";
import { setHighlightId } from "../../../../store/poi";
import { markers } from "../../../../utils/googleMaps";
import { maps } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { setupDrawerParams } from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const highlightId = useSelector((state: IRootState) => state.poi.highlightId);
  const prevHighlightId = React.useRef<string | null>("");
  // get all pois without clusterId
  const { data: pois } = useGetPoisQuery();

  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (poiId: string) => dispatch(setHighlightId(poiId)),
    [dispatch],
  );

  const handlePoiClick = React.useCallback(
    (poiId: string) => {
      setupDrawerParams<"poi">({ poiId: poiId }, searchParams, setSearchParams);
    },
    [searchParams, setSearchParams],
  );

  // set all pois markers on map
  React.useEffect(() => {
    if (pois) {
      markers.poi.setPois(pois);
      // add poiId to url params when poi marker is clicked
      setOnPoiMarkerClick(handlePoiClick);
      // set highlightId when poi marker is clicked
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [pois, handlePoiClick, handleClick]);

  React.useEffect(() => {
    if (highlightId && pois && pois[highlightId]) {
      const { latitude, longitude } = pois[highlightId].latlng;
      const north = maps.getBounds()?.getNorthEast().lat();
      const south = maps.getBounds()?.getSouthWest().lat();
      maps.panTo(
        north && south ? latitude - (north - south) / 4 : latitude,
        longitude,
      );

      markers.poi.toggleHighlightIcon(
        highlightId,
        pois[highlightId].status.type,
        true,
      );
      if (prevHighlightId.current) {
        markers.poi.toggleHighlightIcon(
          prevHighlightId.current,
          pois[prevHighlightId.current].status.type,
          false,
        );
      }
    }

    prevHighlightId.current = highlightId;
  }, [highlightId, pois]);
  return <></>;
};

export default PoiMarkers;
