import React from "react";
import { useDispatch } from "react-redux";

import { useGetPoisQuery } from "../../../../api/poi";
import DrawerType from "../../../../models/drawer";
import { pushDrawer } from "../../../../store/mapDrawer";
import { markers } from "../../../../utils/googleMaps";
import { setOnPoiMarkerClick } from "../../../../utils/googleMaps/markers/poi";

const PoiMarkers: React.FC = () => {
  const dispatch = useDispatch();

  const { data: pois } = useGetPoisQuery();

  const handlePoiMarkerClick = React.useCallback(
    (poiId: string) => {
      dispatch(pushDrawer({ type: DrawerType.PoiView, id: poiId }));
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
