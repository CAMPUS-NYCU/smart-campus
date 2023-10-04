import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { routeParams, routeParamsKeys } from "../../../models/route";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected =
    searchParams.get(routeParamsKeys.markerType) ===
    routeParams.markerType.cluster;
  const id = selected ? searchParams.get(routeParamsKeys.markerId) : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const handleDrawerClose = () => {
    searchParams.delete(routeParamsKeys.markerType);
    searchParams.delete(routeParamsKeys.markerId);
    setSearchParams(searchParams);
  };

  return (
    <Drawer
      open={selected}
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
