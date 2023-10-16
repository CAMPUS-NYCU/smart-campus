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

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportData = useSelector((state: IRootState) => state.report.data);
  const reportMedia = useSelector((state: IRootState) => state.report.media);

  const [addPoi] = useAddPoiMutation();

  const selected =
    reportType === "add" && isCurrentDrawerParams("cluster", searchParams);
  const id = getParamsFromDrawer("cluster", searchParams).clusterId;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const handleSubmit = () => {
    addPoi({ data: reportData, media: reportMedia })
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
        <Button onClick={handleDrawerConfirm}>
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
