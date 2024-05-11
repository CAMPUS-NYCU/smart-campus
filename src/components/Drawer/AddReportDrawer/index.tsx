import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useAddPoiMutation } from "../../../api/poi";
import { IRootState } from "../../../store";
import { closeModal, openModal } from "../../../store/modal";
import { resetReport, updateAddReportData } from "../../../store/report";
import { setupDrawerParams } from "../../../utils/routes/params";

import Drawer from "..";
import AddReportDrawerContent from "./AddReportDrawerContent";
import AddReportDrawerConfirm from "./AddReportDrawerConfirm";
import CreatingFlag from "./CreatingFlag";
import { PoiData } from "../../../models/poi";
import { maps } from "../../../utils/googleMaps";

const reportDataValidator = (reportData: PoiData) => {
  const { target, status } = reportData;

  const isTargetValid = target && target.category !== "" && target.name !== "";
  const isStatusValid = status && status.type !== "" && status.value !== "";

  return reportData && isTargetValid && isStatusValid;
};

const AddReportDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = useSelector((state: IRootState) => state.report.type);
  const reportData = useSelector((state: IRootState) => state.report.data);

  const dispatch = useDispatch();

  const [addPoi] = useAddPoiMutation();

  const selected = reportType === "add";

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

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    const north = maps.getBounds()?.getNorthEast().lat();
    const south = maps.getBounds()?.getSouthWest().lat();
    if (!center || !north || !south) {
      throw new Error("LatLng not found");
    }

    const latlng = {
      latitude: south + (north - south) * 0.75,
      longitude: center.lng(),
    };
    dispatch(updateAddReportData({ latlng }));
  };

  const handleDrawerConfirm = () => {
    handleSetLatLng();
    dispatch(openModal("confirmAddReport"));
  };

  const handleDrawerDismiss = () => {
    dispatch(resetReport());
  };

  const [isReportDataFilled, setIsReportDataFilled] = React.useState(false);
  React.useEffect(() => {
    setIsReportDataFilled(reportDataValidator(reportData));
  }, [reportData]);

  return (
    <>
      {selected && <CreatingFlag />}
      <Drawer
        open={selected}
        onClose={handleDrawerDismiss}
        title={
          <span>
            {t("addReport.title", {
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
      />
    </>
  );
};

export default AddReportDrawer;
