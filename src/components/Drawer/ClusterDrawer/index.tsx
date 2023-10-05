import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { routeParams, routeParamsKeys } from "../../../models/route";
import { IRootState } from "../../../store";
import { addReport } from "../../../store/report";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const type = useSelector((state: IRootState) => state.report.type);

  const selected = (() => {
    if (type) {
      return false;
    }

    const routeParamsMarkerType = searchParams.get(routeParamsKeys.markerType);
    return routeParamsMarkerType === routeParams.markerType.cluster;
  })();

  const id = selected ? searchParams.get(routeParamsKeys.markerId) : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const clearMarkerRouteParams = () => {
    searchParams.delete(routeParamsKeys.markerType);
    searchParams.delete(routeParamsKeys.markerId);
    setSearchParams(searchParams);
  };

  const handleDrawerConfirm = () => {
    if (!id) {
      throw new Error("ClusterDrawer: id is null");
    }

    dispatch(addReport(id));
  };

  const handleDrawerDismiss = () => {
    clearMarkerRouteParams();
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
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
      primaryButton={<Button onClick={handleDrawerConfirm}>Add</Button>}
      secondaryButton={<button onClick={handleDrawerDismiss}>Dismiss</button>}
    />
  );
};

export default ClusterDrawer;
