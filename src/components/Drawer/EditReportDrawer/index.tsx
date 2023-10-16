import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { useUpdatePoiMutation } from "../../../api/poi";
import { IRootState } from "../../../store";
import { resetReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";
import AddReportDrawerContent from "./EditReportDrawerContent";
import AddReportDrawerConfirm from "./EditReportDrawerConfirm";
import { closeModal, openModal } from "../../../store/modal";

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportId = useSelector((state: IRootState) => state.report.id);
  const reportData = useSelector((state: IRootState) => state.report.data);
  const reportMedia = useSelector((state: IRootState) => state.report.media);

  const [editPoi] = useUpdatePoiMutation();

  const selected =
    reportType === "edit" && isCurrentDrawerParams("poi", searchParams);
  const id = getParamsFromDrawer("cluster", searchParams).clusterId;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });

  const handleSubmit = () => {
    if (!reportId) {
      throw new Error("EditReportDrawer: report POI id not found");
    }

    editPoi({
      id: reportId,
      data: { ...reportData },
      media: reportMedia,
    })
      .unwrap()
      .then(() => {
        dispatch(resetReport());
        dispatch(closeModal("confirmEditReport"));
      });
  };

  const handleDrawerConfirm = () => {
    dispatch(openModal("confirmEditReport"));
  };

  const handleDrawerDismiss = () => {
    resetReport();
    dispatch(resetReport());
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={
        <span>
          {t("editReport.title", {
            poi: poi?.data.name,
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
          {t("editReport.buttons.edit", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerDismiss}>
          {t("editReport.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default AddReportDrawer;
