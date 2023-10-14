import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input, Select, SelectItem } from "@nextui-org/react";

import { poiStatus, poiStatusMessageKeys } from "../../../constants/model/poi";
import { PoiStatus } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";

const StatusSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const status = reportData.status;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(updateAddReportData({ status: e.target.value as PoiStatus }));
    }
  };

  return (
    <Select
      label={t("editReport.content.select.setStatus.label", {
        ns: ["drawer"],
      })}
      selectedKeys={new Set([status])}
      onChange={handleSelectChange}
    >
      {Object.keys(poiStatus).map((s) => (
        <SelectItem key={s} value={s}>
          {t(poiStatusMessageKeys[s] || "", {
            ns: ["model"],
          })}
        </SelectItem>
      ))}
    </Select>
  );
};

const AddReportDrawerContentPhotos: React.FC = () => {
  const reportMedia = useSelector((state: IRootState) => state.report.media);

  return (
    <div className="flex flex-row">
      {reportMedia.photoUrls.map((url) => (
        <Image key={url} src={url} alt="" />
      ))}
    </div>
  );
};

const AddReportDrawerContent: React.FC = () => {
  const { t } = useTranslation();

  const reportData = useSelector((state: IRootState) => state.report.data);

  return (
    <div>
      <Input
        disabled
        label={t("editReport.content.inputs.name.label", { ns: ["drawer"] })}
        value={reportData.name || ""}
        isInvalid={!reportData.name}
        variant="bordered"
      />
      <Input
        disabled
        label={t("editReport.content.inputs.description.label", {
          ns: ["drawer"],
        })}
        value={reportData.description || ""}
        isInvalid={!reportData.description}
        variant="bordered"
      />
      <StatusSelect />
      <AddReportDrawerContentPhotos />
    </div>
  );
};

export default AddReportDrawerContent;
