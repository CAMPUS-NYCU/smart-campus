import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useGetPoisQuery } from "../../../../api/poi";
import { UIPoiData, UIPois } from "../../../../models/uiPoi";
import { Pois } from "../../../../models/poi";
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
  const { data: pois, isLoading: isPoisLoading } = useGetPoisQuery(clusterId);
  const [resolvedPois, setResolvedPois] = React.useState<Pois>();

  React.useEffect(() => {
    if (!isPoisLoading && pois) {
      setResolvedPois(pois);
    }
  }, [pois, isPoisLoading]);

  const recommandContributions = useSelector(
    (state: IRootState) => state.llm.recommandContributions,
  );

  const uiPois: UIPois | null = React.useMemo(() => {
    if (resolvedPois) {
      return Object.fromEntries(
        Object.entries(resolvedPois).map(([poiId, poiData]) => [
          poiId,
          {
            ...poiData,
            isVisible:
              recommandContributions.length > 0
                ? recommandContributions.includes(poiId)
                : true,
          } as UIPoiData,
        ]),
      );
    } else {
      return null;
    }
  }, [resolvedPois, recommandContributions]);

  // visibility will not work due to `setHighlightId` will rewrite the whole pois
  // React.useEffect(() => {
  //   if (recommandContributions.length > 0) {
  //     markers.poi.toggleVisibilityIconNone();
  //     markers.poi.toggleVisibilityIcon(recommandContributions);
  //   } else {
  //     markers.poi.toggleVisibilityIconAll();
  //   }
  // }, [recommandContributions]);

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
    if (uiPois && Object.keys(uiPois).length !== 0) {
      markers.poi.setPois(uiPois);
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [uiPois, handleClick]);

  React.useEffect(() => {
    if (highlightId && uiPois && uiPois[highlightId]) {
      const { latitude, longitude } = uiPois[highlightId].latlng;
      const north = maps.getBounds()?.getNorthEast().lat();
      const south = maps.getBounds()?.getSouthWest().lat();
      maps.panTo(
        north && south ? latitude - (north - south) / 4 : latitude,
        longitude,
      );

      markers.poi.toggleHighlightIcon(
        highlightId,
        uiPois[highlightId].target.name,
        true,
      );
      if (prevHighlightId.current) {
        markers.poi.toggleHighlightIcon(
          prevHighlightId.current,
          uiPois[prevHighlightId.current].target.name,
          false,
        );
      }
    }

    prevHighlightId.current = highlightId;
  }, [highlightId, uiPois]);
  return <></>;
};

export default PoiMarkers;
