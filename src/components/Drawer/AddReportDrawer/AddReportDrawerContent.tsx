import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";

import { poiStatus, poiStatusMessageKeys } from "../../../constants/model/poi";
import { PoiStatus } from "../../../models/poi";
import { IRootState } from "../../../store";
import {
  ReportData,
  updateAddReportData,
  updateAddReportMedia,
} from "../../../store/report";
import { maps } from "../../../utils/googleMaps";

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
      label={t("addReport.content.select.setStatus.label", {
        ns: ["drawer"],
      })}
      selectedKeys={new Set([status])}
      onChange={handleSelectChange}
    >
      {Object.keys(poiStatus).map((s) => (
        <SelectItem key={s} value={s}>
          {t(poiStatusMessageKeys[s] || "", {
            ns: ["drawer"],
          })}
        </SelectItem>
      ))}
    </Select>
  );
};

const AddReportDrawerContentPhotos: React.FC = () => {
  const dispatch = useDispatch();
  const reportMedia = useSelector((state: IRootState) => state.report.media);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const blobUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    dispatch(
      updateAddReportMedia({
        photoUrls: [...reportMedia.photoUrls, ...blobUrls],
      }),
    );
  };

  return (
    <div className="flex flex-row">
      {reportMedia.photoUrls.map((url) => (
        <Image key={url} src={url} alt="" />
      ))}
      <input type="file" multiple onChange={handleUpload} />
    </div>
  );
};

const AddReportDrawerContent: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);

  const handleUpdateData = (key: keyof ReportData) => {
    const oldValue = reportData[key];
    return (value: typeof oldValue) => {
      dispatch(updateAddReportData({ [key]: value }));
    };
  };

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }

    const updateLatLng = handleUpdateData("latlng");
    const newLagLng = { latitude: center.lat(), longitude: center.lng() };
    updateLatLng(newLagLng);
  };

  return (
    <div>
      <Input
        autoFocus
        label={t("addReport.content.inputs.name.label", { ns: ["drawer"] })}
        autoComplete="text"
        value={reportData.name || ""}
        isInvalid={!reportData.name}
        onValueChange={handleUpdateData("name")}
        variant="bordered"
      />
      <Input
        label={t("addReport.content.inputs.description.label", {
          ns: ["drawer"],
        })}
        autoComplete="text"
        value={reportData.description || ""}
        isInvalid={!reportData.description}
        onValueChange={handleUpdateData("description")}
        variant="bordered"
      />
      <div className="flex justify-between items-center">
        <h1>
          {t("addReport.content.text.setLocation", {
            ns: ["drawer"],
          })}
        </h1>
        <Button onClick={handleSetLatLng}>
          {t("addReport.content.button.setLocation", {
            ns: ["drawer"],
          })}
        </Button>
      </div>
      <StatusSelect />
      <AddReportDrawerContentPhotos />
    </div>
  );
};

export default AddReportDrawerContent;
