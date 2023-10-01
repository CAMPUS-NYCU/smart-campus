import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import DrawerType from "../../../models/drawer";
import { IRootState } from "../../../store";
import { clearDrawerHistory } from "../../../store/mapDrawer";

import Drawer from "..";

const PoiDrawer: React.FC = () => {
  const dispatch = useDispatch();

  const currentDrawer = useSelector(
    (state: IRootState) => state.mapDrawer.current,
  );
  const isDrawerOpen = currentDrawer?.type === DrawerType.PoiView;
  const id = currentDrawer?.id || null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !isDrawerOpen,
  });

  const handleDrawerClose = React.useCallback(() => {
    dispatch(clearDrawerHistory());
  }, [dispatch]);

  return (
    <Drawer
      open={!!isDrawerOpen}
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
