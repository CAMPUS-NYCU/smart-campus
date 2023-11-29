import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";

import {
  poiStatusType,
  poiStatusTypeMessageKeys,
} from "../../../constants/model/poi";
import { useGetClusterQuery } from "../../../api/cluster";
import { PoiStatusType } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import { maps } from "../../../utils/googleMaps";
import { getOptions } from "../../../constants/createOptions";

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
      label={t("addReport.content.select.setStatusType.label", {
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
  const reportData = useSelector((state: IRootState) => state.report.data);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const blobUrls = Array.from(files).map((file) => URL.createObjectURL(file));

    dispatch(
      updateAddReportData({
        photoPaths: [...reportData.photoPaths, ...blobUrls],
      }),
    );
  };

  return (
    <div className="flex flex-row">
      {reportData.photoPaths.map((url) => (
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
  const { data: cluster } = useGetClusterQuery(reportData.clusterId);
  const options = getOptions(cluster?.data.name || "");
  const floorOptions = options.floor;
  const [targetCategoryOptions, setTargetCategoryOptions] = useState([""]);
  const [targetNameOptions, setTargetNameOptions] = useState([""]);
  const [targetSerialOptions, setTargetSerialOptions] = useState([""]);

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }

    const latlng = { latitude: center.lat(), longitude: center.lng() };
    dispatch(updateAddReportData({ latlng }));
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          floor: e.target.value,
          target: {
            category: "",
            name: "",
            serial: "",
          },
        }),
      );
    }
    const fitFloor = options.targetCategory.find(
      (i) => i.floor === e.target.value,
    );
    setTargetCategoryOptions(fitFloor ? fitFloor.category : []);
  };

  const handleTargetCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            category: e.target.value,
            name: "",
            serial: "",
          },
        }),
      );
    }

    const fitCategory = options.targetName.find(
      (i) => i.floor === reportData.floor && i.category === e.target.value,
    );
    setTargetNameOptions(fitCategory ? fitCategory.name : []);
  };

  const handleTargetNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            name: e.target.value,
            serial: "",
          },
        }),
      );
    }

    const fitName = options.targetSerial.find(
      (i) =>
        i.floor === reportData.floor &&
        i.category === reportData.target.category &&
        i.name === e.target.value,
    );
    setTargetSerialOptions(fitName ? fitName.serial : []);
  };

  const handleTargetSerialChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            serial: e.target.value,
          },
        }),
      );
    }
  };

  return (
    <div className="flex flex-col max-h-[calc(50vh-100px)]">
      {/* 回報地點 */}
      <div className="flex flex-row space-x-1 mt-1 items-center">
        <p className="basis-2/12 text-xs font-bold">
          {t("addReport.content.text.setLocation", {
            ns: ["drawer"],
          })}
        </p>
        <Input
          aria-label="set location"
          defaultValue={cluster?.data.name}
          variant="underlined"
          classNames={{ base: "basis-6/12" }}
          readOnly
        />
        <Button
          radius="full"
          size="sm"
          className="min-w-fit h-fit px-2 py-1"
          onClick={handleSetLatLng}
        >
          {t("addReport.content.button.setLocation", {
            ns: ["drawer"],
          })}
        </Button>
      </div>
      {/* 回報樓層 */}
      <div className="flex flex-row space-x-1 mt-1 items-center">
        <p className="basis-2/12 text-xs font-bold">
          {t("addReport.content.select.setFloor.label", { ns: ["drawer"] })}
        </p>
        <Select
          label={t("addReport.content.select.setFloor.label", {
            ns: ["drawer"],
          })}
          selectedKeys={new Set([reportData.floor])}
          onChange={handleFloorChange}
        >
          {floorOptions.map((s) => {
            return (
              <SelectItem key={s} value={s}>
                {s ? s : "請選擇"}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      {/* 回報類別 */}
      <div className="flex flex-row space-x-1 mt-1 items-center">
        <p className="basis-2/12 text-xs font-bold">
          {t("addReport.content.select.setTargetCategory.label", {
            ns: ["drawer"],
          })}
        </p>
        <Select
          label={t("addReport.content.select.setTargetCategory.label", {
            ns: ["drawer"],
          })}
          selectedKeys={new Set([reportData.target.category])}
          onChange={handleTargetCategoryChange}
        >
          {targetCategoryOptions.map((s) => {
            return (
              <SelectItem key={s} value={s}>
                {s ? s : "請選擇"}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      {/* 回報項目 */}
      <div className="flex flex-row space-x-1 mt-1 items-center">
        <p className="basis-2/12 text-xs font-bold">
          {t("addReport.content.select.setTargetName.label", {
            ns: ["drawer"],
          })}
        </p>
        <Select
          label={t("addReport.content.select.setTargetName.label", {
            ns: ["drawer"],
          })}
          selectedKeys={new Set([reportData.target.name])}
          onChange={handleTargetNameChange}
        >
          {targetNameOptions.map((s) => {
            return (
              <SelectItem key={s} value={s}>
                {s ? s : "請選擇"}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      {/* 項目描述 */}
      <div className="flex flex-row space-x-1 mt-1 items-center">
        <p className="basis-2/12 text-xs font-bold">
          {t("addReport.content.select.setTargetSerial.label", {
            ns: ["drawer"],
          })}
        </p>
        <Select
          label={t("addReport.content.select.setTargetSerial.label", {
            ns: ["drawer"],
          })}
          selectedKeys={new Set([reportData.target.serial])}
          onChange={handleTargetSerialChange}
        >
          {targetSerialOptions.map((s) => {
            return (
              <SelectItem key={s} value={s}>
                {s ? s : "請選擇"}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      {/* 回報狀態 */}
      {/* 狀態描述 */}
      <StatusSelect />
      <AddReportDrawerContentPhotos />
    </div>
  );
};

export default AddReportDrawerContent;
