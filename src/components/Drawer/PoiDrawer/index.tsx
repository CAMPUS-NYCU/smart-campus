import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { IRootState } from "../../../store";
import { resetCurrentPoiId } from "../../../store/poiModal";

import Drawer from "..";

const PoiDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const poiId = useSelector((state: IRootState) => state.poiModal.currentPoiId);

  const { data: poi } = useGetPoiQuery(poiId);

  const handleDrawerClose = React.useCallback(() => {
    dispatch(resetCurrentPoiId());
  }, [dispatch]);

  return (
    <Drawer
      open={!!poiId}
      onClose={handleDrawerClose}
      title={poi?.data.name}
      children={
        <div>
          <div>description: {poi?.data.description}</div>
          <div>
            latlng: {poi?.data.latlng.latitude}, {poi?.data.latlng.longitude}
          </div>
        </div>
      }
      primaryButton={<Button onClick={handleDrawerClose}>primary</Button>}
      secondaryButton={<button onClick={handleDrawerClose}>secondary</button>}
    />
  );
};

export default PoiDrawer;
