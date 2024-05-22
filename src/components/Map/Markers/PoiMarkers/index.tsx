import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useGetPoiQuery, useGetPoisQuery } from "../../../../api/poi";
import UIPoi, { UIPoiData, UIPois } from "../../../../models/uiPoi";
import Poi, { Pois } from "../../../../models/poi";
import { IRootState } from "../../../../store";
import { setHighlightId } from "../../../../store/poi";
import { markers } from "../../../../utils/googleMaps";
import { maps } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";
import { getParamsFromDrawer } from "../../../../utils/routes/params";

const PoiMarkers: React.FC = () => {
  const [searchParams] = useSearchParams();

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

  const poiId = getParamsFromDrawer("poi", searchParams).poiId;
  const { data: poi, isLoading: isPoiLoading } = useGetPoiQuery(poiId);
  const [resolvedPoi, setResolvedPoi] = React.useState<Poi>();

  React.useEffect(() => {
    if (!isPoiLoading && poi) {
      setResolvedPoi(poi);
    }
  }, [poi, isPoiLoading]);

  const uiPoi: UIPoi | null = React.useMemo(() => {
    if (resolvedPoi) {
      const newData: UIPoiData = {
        ...resolvedPoi.data,
        isVisible: true,
      };
      return {
        id: resolvedPoi.id,
        data: newData,
      } as UIPoi;
    } else {
      return null;
    }
  }, [resolvedPoi]);

  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (poiId: string) => dispatch(setHighlightId(poiId)),
    [dispatch],
  );

  React.useEffect(() => {
    if (uiPois && Object.keys(uiPois).length !== 0) {
      markers.poi.setPois(uiPois);
      setOnPoiMarkerClick(handleClick);
    } else if (uiPoi) {
      markers.poi.setPois({ [uiPoi.id]: uiPoi.data });
      setOnPoiMarkerClick(handleClick);
    }

    return () => {
      markers.poi.clear();
    };
  }, [uiPoi, uiPois, handleClick]);

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
