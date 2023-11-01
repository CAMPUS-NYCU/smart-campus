import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input, Select, SelectItem } from "@nextui-org/react";

import {
  poiStatusName,
  poiStatusNameMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusName } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";

const StatusSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const status = reportData.status.name;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          status: {
            ...reportData.status,
            name: e.target.value as PoiStatusName,
          },
        }),
      );
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
      {Object.keys(poiStatusName).map((s) => (
        <SelectItem key={s} value={s}>
          {t(poiStatusNameMessageKeys[s] || "", {
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
        value={reportData.target.name || ""}
        isInvalid={!reportData.target.name}
        variant="bordered"
      />
      <Input
        disabled
        label={t("editReport.content.inputs.description.label", {
          ns: ["drawer"],
        })}
        value={reportData.target.description || ""}
        isInvalid={!reportData.target.description}
        variant="bordered"
      />
      <StatusSelect />
      <AddReportDrawerContentPhotos />
    </div>
  );
};

export default AddReportDrawerContent;
