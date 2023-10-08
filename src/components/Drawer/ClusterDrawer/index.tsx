import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { IRootState } from "../../../store";
import { addReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected =
    !reportType && isCurrentDrawerParams("cluster", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const clearMarkerRouteParams = () => {
    resetDrawerParams(searchParams, setSearchParams);
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
