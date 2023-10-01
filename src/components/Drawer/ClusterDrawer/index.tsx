import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import DrawerType from "../../../models/drawer";
import { IRootState } from "../../../store";
import { clearDrawerHistory } from "../../../store/mapDrawer";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const dispatch = useDispatch();

  const currentDrawer = useSelector(
    (state: IRootState) => state.mapDrawer.current,
  );
  const isDrawerOpen = currentDrawer?.type === DrawerType.ClusterView;
  const id = currentDrawer?.id || null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !isDrawerOpen,
  });

  const handleDrawerClose = React.useCallback(() => {
    dispatch(clearDrawerHistory());
  }, [dispatch]);

  return (
    <Drawer
      open={!!isDrawerOpen}
      onClose={handleDrawerClose}
      title={cluster?.data.name}
      children={
        <div>
          <div>description: {cluster?.data.description}</div>
          <div>
            latlng: {cluster?.data.latlng.latitude},{" "}
            {cluster?.data.latlng.longitude}
          </div>
        </div>
      }
      primaryButton={<Button onClick={handleDrawerClose}>primary</Button>}
      secondaryButton={<button onClick={handleDrawerClose}>secondary</button>}
    />
  );
};

export default ClusterDrawer;
