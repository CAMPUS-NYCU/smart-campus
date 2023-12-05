import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useAddPoiMutation } from "../../../api/poi";
import { IRootState } from "../../../store";
import { closeModal, openModal } from "../../../store/modal";
import { resetReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  setupDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";
import AddReportDrawerContent from "./AddReportDrawerContent";
import AddReportDrawerConfirm from "./AddReportDrawerConfirm";
import { PoiData } from "../../../models/poi";
import { maps } from "../../../utils/googleMaps";
import { markers } from "../../../utils/googleMaps";

const reportDataValidator = (reportData: PoiData) => {
  const { latlng, target, status } = reportData;

  const isLatLngValid =
    latlng && latlng.latitude !== 0 && latlng.longitude !== 0;
  const isTargetValid =
    target &&
    target.category !== "" &&
    target.name !== "" &&
    target.serial !== "";
  const isStatusValid =
    status && status.type !== "unknown" && status.value !== "unknown";

  return reportData && isLatLngValid && isTargetValid && isStatusValid;
};

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const dispatch = useDispatch();

  const [addPoi] = useAddPoiMutation();

  const selected =
    reportType === "add" && isCurrentDrawerParams("cluster", searchParams);
  const id = getParamsFromDrawer("cluster", searchParams).clusterId;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const handleSubmit = () => {
    addPoi({ data: reportData })
      .unwrap()
      .then((poiId) => {
        dispatch(resetReport());
        setupDrawerParams<"poi">(
          { poiId: poiId },
          searchParams,
          setSearchParams,
        );
        dispatch(closeModal("confirmAddReport"));
      });
  };

  const handleDrawerConfirm = () => {
    dispatch(openModal("confirmAddReport"));
  };

  const handleDrawerDismiss = () => {
    dispatch(resetReport());
  };

  const [isReportDataFilled, setIsReportDataFilled] = React.useState(false);
  React.useEffect(() => {
    setIsReportDataFilled(reportDataValidator(reportData));
  }, [reportData]);

  const center = maps.getCenter();
  React.useEffect(() => {
    if (selected && center !== null && center !== undefined) {
      markers.creatingFlag.setLatLng(center?.lat(), center?.lng());
    } else {
      markers.creatingFlag.clear();
    }

    return () => {
      markers.creatingFlag.clear();
    };
  }, [selected, center]);

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={
        <span>
          {t("addReport.title", {
            cluster: cluster?.data.name,
            ns: ["drawer"],
          })}
        </span>
      }
      children={
        <>
          <AddReportDrawerContent />
          <AddReportDrawerConfirm onSubmit={handleSubmit} />
        </>
      }
      primaryButton={
        <Button
          radius="full"
          isDisabled={!isReportDataFilled}
          className="bg-primary h-fit px-2 py-1.5"
          onClick={handleDrawerConfirm}
        >
          {t("addReport.buttons.add", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerDismiss}>
          {t("addReport.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default AddReportDrawer;
