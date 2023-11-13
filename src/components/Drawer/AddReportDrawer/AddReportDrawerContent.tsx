import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";

import {
  poiStatusType,
  poiStatusTypeMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusType } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import { maps } from "../../../utils/googleMaps";

const StatusSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const status = reportData.status.type;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          status: {
            ...reportData.status,
            type: e.target.value as PoiStatusType,
          },
        }),
      );
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
      {Object.keys(poiStatusType).map((s) => (
        <SelectItem key={s} value={s}>
          {t(poiStatusTypeMessageKeys[s] || "", {
            ns: ["model"],
          })}
        </SelectItem>
      ))}
    </Select>
  );
};

const AddReportDrawerContentPhotos: React.FC = () => {
  const dispatch = useDispatch();
  // get origin PoiData photoUrls
  const reportData = useSelector((state: IRootState) => state.report.data);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const blobUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    // store blob urls to reportData
    dispatch(
      updateAddReportData({
        photoUrls: [...reportData.photoUrls, ...blobUrls],
      }),
    );
  };

  return (
    <div className="flex flex-row">
      {reportData.photoUrls.map((url) => (
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

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }

    const latlng = { latitude: center.lat(), longitude: center.lng() };
    dispatch(updateAddReportData({ latlng }));
  };

  return (
    <div>
      <Input
        autoFocus
        label={t("addReport.content.inputs.name.label", { ns: ["drawer"] })}
        autoComplete="text"
        value={reportData.target.name || ""}
        isInvalid={!reportData.target.name}
        onValueChange={(value) =>
          dispatch(
            updateAddReportData({
              target: { ...reportData.target, name: value },
            }),
          )
        }
        variant="bordered"
      />
      <Input
        label={t("addReport.content.inputs.description.label", {
          ns: ["drawer"],
        })}
        autoComplete="text"
        value={reportData.target.serial || ""}
        isInvalid={!reportData.target.serial}
        onValueChange={(value) =>
          dispatch(
            updateAddReportData({
              target: { ...reportData.target, serial: value },
            }),
          )
        }
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
