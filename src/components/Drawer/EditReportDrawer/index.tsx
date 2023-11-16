import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { useUpdatePoiMutation } from "../../../api/poi";
import { IRootState } from "../../../store";
import { resetReport } from "../../../store/report";

import Drawer from "..";
import AddReportDrawerContent from "./EditReportDrawerContent";
import AddReportDrawerConfirm from "./EditReportDrawerConfirm";
import { closeModal, openModal } from "../../../store/modal";

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportId = useSelector((state: IRootState) => state.report.id);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const dispatch = useDispatch();

  const [editPoi] = useUpdatePoiMutation();

  const selected = reportType === "edit";

  const { data: poi } = useGetPoiQuery(reportId, {
    skip: !selected,
  });

  const handleSubmit = () => {
    if (!reportId) {
      throw new Error("EditReportDrawer: report POI id not found");
    }

    editPoi({
      id: reportId,
      data: { ...reportData },
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
            poi: poi?.data.target.name,
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
