import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useGetPoisQuery } from "../../../../api/poi";
import { IRootState } from "../../../../store";
import { setHighlightId } from "../../../../store/poi";
import { markers } from "../../../../utils/googleMaps";
import { maps } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { getParamsFromDrawer } from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const highlightId = useSelector((state: IRootState) => state.poi.highlightId);

  const prevHighlightId = React.useRef<string | null>("");

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: pois } = useGetPoisQuery(clusterId);

  const recommandContributions = useSelector(
    (state: IRootState) => state.llm.recommandContributions,
  );

  // visibility will not work due to `setHighlightId` will rewrite the whole pois
  React.useEffect(() => {
    if (recommandContributions.length > 0) {
      markers.poi.toggleVisibilityIconNone();
      markers.poi.toggleVisibilityIcon(recommandContributions);
    } else {
      markers.poi.toggleVisibilityIconAll();
    }
  }, [recommandContributions]);

  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (poiId: string) => {
      if (poiId !== highlightId) {
        setSearchParams({ clusterId, poiId });
        dispatch(setHighlightId(poiId));
      }
    },
    [dispatch, setSearchParams, clusterId, highlightId],
  );

  React.useEffect(() => {
    if (pois && Object.keys(pois).length !== 0) {
      markers.poi.setPois(pois);
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [pois, handleClick]);

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
        pois[highlightId].target.name,
        true,
      );
      if (prevHighlightId.current) {
        markers.poi.toggleHighlightIcon(
          prevHighlightId.current,
          pois[prevHighlightId.current].target.name,
          false,
        );
      }
    }

    prevHighlightId.current = highlightId;
  }, [highlightId, pois]);
  return <></>;
};

export default PoiMarkers;
