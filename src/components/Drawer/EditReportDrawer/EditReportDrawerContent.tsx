import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Select, SelectItem, Chip } from "@nextui-org/react";

import {
  poiStatusValueSelect,
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusValue } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import noImage from "../../../assets/images/noImage.svg";
import poiEditDrawerTargetName from "../../../assets/images/poiEditDrawerTargetName.svg";
import poiEditDrawerTargetSerial from "../../../assets/images/poiEditDrawerTargetSerial.svg";
import poiEditDrawerStatusType from "../../../assets/images/poiEditDrawerStatusType.svg";
import poiEditDrawerStatusValue from "../../../assets/images/poiEditDrawerStatusValue.svg";
import { statusColor } from "../../../constants/statusStyle";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";

const StatusValueSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const statusValue = reportData.status.value;
  const statusValueOption = poiStatusValueSelect[reportData.status.type];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          status: {
            ...reportData.status,
            value: e.target.value as PoiStatusValue,
          },
        }),
      );
    }
  };

  return (
    <Select
      selectedKeys={new Set([statusValue])}
      onChange={handleSelectChange}
      radius="sm"
      aria-label="select status value"
      classNames={{
        value: "text-xs",
        innerWrapper: "pt-0",
        trigger: "py-0 h-7 min-h-fit bg-primary",
        base: "min-w-fit w-[50%]",
      }}
    >
      {statusValueOption.map((s) => (
        <SelectItem key={s} value={s}>
          {s === "unknown"
            ? "請選擇"
            : t(poiStatusValueMessageKeys[s] || "", {
                ns: ["model"],
              })}
        </SelectItem>
      ))}
    </Select>
  );
};

const AddReportDrawerContentPhotos: React.FC = () => {
  const reportData = useSelector((state: IRootState) => state.report.data);
  const [urls, setUrls] = useState<string[]>([]);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    if (reportData?.photoPaths) {
      const fetchUrls = async () => {
        const urlPromises = reportData.photoPaths.map((path) =>
          path.startsWith("blob:")
            ? Promise.resolve(path)
            : getDownloadURL(ref(storage, path)),
        );
        const resolvedUrls = await Promise.all(urlPromises);
        setUrls(resolvedUrls);
      };

      fetchUrls();
    }
  }, [reportData, storage]);

  return (
    <div className="flex flex-row justify-center basis-6/12 overflow-y-hidden">
      {urls.length > 0 ? (
        urls.map((url) => (
          <Image
            key={url}
            src={url}
            alt="report images"
            classNames={{
              img: "h-[100%]",
              wrapper: "justify-center flex",
            }}
          />
        ))
      ) : (
        <Image
          src={noImage}
          alt="No image available"
          classNames={{
            img: "h-[100%]",
            wrapper: "justify-center flex",
          }}
        />
      )}
    </div>
  );
};

const AddReportDrawerContent: React.FC = () => {
  const { t } = useTranslation();

  const reportData = useSelector((state: IRootState) => state.report.data);

  return (
    <div className="flex flex-col max-h-[calc(50vh-100px)]">
      <AddReportDrawerContentPhotos />
      <div className="flex flex-col basis-6/12">
        {/* 回報項目 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image
              radius="none"
              src={poiEditDrawerTargetName}
              alt="target name"
            />
          </div>
          <p className="text-xs font-bold">
            {t("editReport.content.texts.targetName", { ns: ["drawer"] })}
          </p>
          <Chip radius="sm" classNames={{ content: "px-0.5 text-xs" }}>
            {reportData.target.name}
          </Chip>
        </div>
        {/* 項目描述 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image
              radius="none"
              src={poiEditDrawerTargetSerial}
              alt="target serial"
            />
          </div>
          <p className="text-xs font-bold">
            {t("editReport.content.texts.targetSerial", { ns: ["drawer"] })}
          </p>
          <Chip radius="sm" classNames={{ content: "px-0.5 text-xs" }}>
            {reportData.target.serial}
          </Chip>
        </div>
        {/* 回報狀態 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image
              radius="none"
              src={poiEditDrawerStatusType}
              alt="status type"
            />
          </div>
          <p className="text-xs font-bold">
            {t("editReport.content.texts.statusType", { ns: ["drawer"] })}
          </p>
          <Chip
            radius="sm"
            classNames={{
              content: "px-0.5 text-xs",
              base: statusColor(reportData.status.type),
            }}
          >
            {t(poiStatusTypeMessageKeys[reportData.status.type], {
              ns: ["model"],
            })}
          </Chip>
        </div>
        {/* 狀態描述 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image
              radius="none"
              src={poiEditDrawerStatusValue}
              alt="status value"
            />
          </div>
          <p className="text-xs font-bold">
            {t("editReport.content.select.setStatusValue.label", {
              ns: ["drawer"],
            })}
          </p>
          <StatusValueSelect />
        </div>
      </div>
    </div>
  );
};

export default AddReportDrawerContent;
