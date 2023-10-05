import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, useDisclosure } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useAddPoiMutation } from "../../../api/poi";
import { useGetUserQuery } from "../../../api/user";
import { routeParams, routeParamsKeys } from "../../../models/route";
import { IRootState } from "../../../store";
import { resetReport } from "../../../store/report";

import Drawer from "..";
import AddReportDrawerContent from "./AddReportDrawerContent";
import AddReportDrawerConfirm from "./AddReportDrawerConfirm";

const AddReportDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const { data: user } = useGetUserQuery();
  const [addPoi] = useAddPoiMutation();

  const confirmDisclosure = useDisclosure();

  const selected = (() => {
    if (reportType !== "add") {
      return false;
    }

    const routeParamsMarkerType = searchParams.get(routeParamsKeys.markerType);
    return routeParamsMarkerType === routeParams.markerType.cluster;
  })();

  const id = selected ? searchParams.get(routeParamsKeys.markerId) : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const handleSubmit = () => {
    if (!user?.id) {
      throw new Error("AddReportDrawer: user id not found");
    }

    addPoi({ ...reportData, createBy: user?.id })
      .unwrap()
      .then((poiId) => {
        dispatch(resetReport());
        searchParams.set(
          routeParamsKeys.markerType,
          routeParams.markerType.poi,
        );
        searchParams.set(routeParamsKeys.markerId, poiId);
        setSearchParams(searchParams);
        confirmDisclosure.onClose();
      });
  };

  const handleDrawerConfirm = () => {
    confirmDisclosure.onOpen();
  };

  const handleDrawerDismiss = () => {
    resetReport();
    dispatch(resetReport());
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={<span>Add a report for {cluster?.data.name}</span>}
      children={
        <>
          <AddReportDrawerContent />
          <AddReportDrawerConfirm
            disclosure={confirmDisclosure}
            onSubmit={handleSubmit}
          />
        </>
      }
      primaryButton={<Button onClick={handleDrawerConfirm}>Add</Button>}
      secondaryButton={<button onClick={handleDrawerDismiss}>Dismiss</button>}
    />
  );
};

export default AddReportDrawer;
