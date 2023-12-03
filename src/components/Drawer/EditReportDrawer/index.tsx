import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useUpdatePoiMutation } from "../../../api/poi";
import { IRootState } from "../../../store";
import { resetReport } from "../../../store/report";

import Drawer from "..";
import AddReportDrawerContent from "./EditReportDrawerContent";
import AddReportDrawerConfirm from "./EditReportDrawerConfirm";
import { closeModal, openModal } from "../../../store/modal";
import { PoiData } from "../../../models/poi";

const reportDataValidator = (reportData: PoiData) => {
  const { status } = reportData;

  const isStatusValid =
    status && status.type !== "unknown" && status.value !== "unknown";

  return isStatusValid;
};

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportId = useSelector((state: IRootState) => state.report.id);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const dispatch = useDispatch();

  const [editPoi] = useUpdatePoiMutation();

  const selected = reportType === "edit";

  const [isStatusValueValid, setIsStatusValueValid] = React.useState(false);
  React.useEffect(() => {
    setIsStatusValueValid(reportDataValidator(reportData));
  }, [reportData]);

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
          isDisabled={!isStatusValueValid}
          className="bg-primary h-fit px-2 py-1.5"
          onClick={handleDrawerConfirm}
        >
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
