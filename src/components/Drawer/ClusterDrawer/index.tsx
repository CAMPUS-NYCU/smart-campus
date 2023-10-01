import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { IRootState } from "../../../store";
import { resetCurrentClusterId } from "../../../store/mapDrawer";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const clusterId = useSelector(
    (state: IRootState) => state.mapDrawer.currentClusterId,
  );

  const { data: cluster } = useGetClusterQuery(clusterId);

  const handleDrawerClose = React.useCallback(() => {
    dispatch(resetCurrentClusterId());
  }, [dispatch]);

  return (
    <Drawer
      open={!!clusterId}
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
