import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

import { useUpdatePoiMutation } from "../../../api/poi";
import { useGetUserQuery } from "../../../api/user";
import { IRootState } from "../../../store";
import { resetReport } from "../../../store/report";

import Drawer from "..";
import EditReportDrawerContent from "./EditReportDrawerContent";
import EditReportDrawerConfirm from "./EditReportDrawerConfirm";
import { closeModal, openModal } from "../../../store/modal";
import { PoiData } from "../../../models/poi";
import { isCurrentDrawerParams } from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { toggleRefetchFlag } from "../../../store/llm";

const reportDataValidator = (reportData: PoiData) => {
  const { status } = reportData;

  const isStatusValid = status && status.type !== "" && status.value !== "";

  return isStatusValid;
};

const EditReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportId = useSelector((state: IRootState) => state.report.id);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [editPoi] = useUpdatePoiMutation();

  const selected = reportType === "edit";

  const { data: user } = useGetUserQuery();

  const recommendState = isCurrentDrawerParams("recommend", searchParams);

  const [isStatusValueValid, setIsStatusValueValid] = React.useState(false);
  React.useEffect(() => {
    setIsStatusValueValid(reportDataValidator(reportData));
  }, [reportData]);

  const handleSubmit = () => {
    if (!reportId || !user?.id) {
      throw new Error(
        "EditReportDrawer: report POI id or user id is not found",
      );
    }

    editPoi({
      id: reportId,
      data: { ...reportData, updatedBy: user.id },
    })
      .unwrap()
      .then(() => {
        if (recommendState) {
          dispatch(toggleRefetchFlag());
        }
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
          <EditReportDrawerContent />
          <EditReportDrawerConfirm onSubmit={handleSubmit} />
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
    />
  );
};

export default EditReportDrawer;
