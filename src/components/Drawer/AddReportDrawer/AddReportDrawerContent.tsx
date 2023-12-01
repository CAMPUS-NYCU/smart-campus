import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";

import {
  poiStatusType,
  poiStatusTypeMessageKeys,
  poiStatusValue,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import Cluster from "../../../models/cluster/index";
import { useGetClusterQuery } from "../../../api/cluster";
import { PoiStatusType, PoiStatusValue } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import { maps } from "../../../utils/googleMaps";
import { getOptions } from "../../../constants/createOptions";

const FloorSelect: React.FC<{ cluster: Cluster | null }> = ({ cluster }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const floor = reportData.floor;
  const floorOptions = getOptions(cluster?.data.name || "").floor;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          floor: e.target.value,
        }),
      );
    }
  };

  return (
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setFloor.label", { ns: ["drawer"] })}
      </p>
      <Select
        label={t("addReport.content.select.setFloor.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([floor])}
        onChange={handleSelectChange}
      >
        {floorOptions.map((s) => {
          return (
            <SelectItem key={s} value={s}>
              {s ? s : "請選擇"}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const TargetCategorySelect: React.FC<{
  cluster: Cluster | null;
}> = ({ cluster }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const targetCategory = reportData.target.category;
  const targetCategoryOptions =
    cluster !== undefined && cluster !== null
      ? getOptions(cluster.data.name).targetCategory[1]?.category || []
      : [""]; // TODO: 要根據 floor 來決定值

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            category: e.target.value,
          },
        }),
      );
    }
  };

  return (
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setTargetCategory.label", {
          ns: ["drawer"],
        })}
      </p>
      <Select
        label={t("addReport.content.select.setTargetCategory.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([targetCategory])}
        onChange={handleSelectChange}
      >
        {targetCategoryOptions.map((s) => {
          return (
            <SelectItem key={s} value={s}>
              {s ? s : "請選擇"}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const TargetNameSelect: React.FC<{ cluster: Cluster | null }> = ({
  cluster,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const targetName = reportData.target.name;
  const targetNameOptions =
    cluster !== undefined && cluster !== null
      ? getOptions(cluster.data.name).targetName[1]?.name || []
      : [""]; // TODO: 要根據 floor, targetCategory 來決定值

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            name: e.target.value,
          },
        }),
      );
    }
  };

  return (
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setTargetName.label", {
          ns: ["drawer"],
        })}
      </p>
      <Select
        label={t("addReport.content.select.setTargetName.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([targetName])}
        onChange={handleSelectChange}
      >
        {targetNameOptions.map((s) => {
          return (
            <SelectItem key={s} value={s}>
              {s ? s : "請選擇"}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const TargetSerialSelect: React.FC<{ cluster: Cluster | null }> = ({
  cluster,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const targetSerial = reportData.target.serial;
  const targetSerialOptions =
    cluster !== undefined && cluster !== null
      ? getOptions(cluster.data.name).targetSerial[1]?.serial || []
      : [""]; // TODO: 要根據 floor, targetCategory, targetName 來決定值

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setTargetSerial.label", {
          ns: ["drawer"],
        })}
      </p>
      <Select
        label={t("addReport.content.select.setTargetSerial.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([targetSerial])}
        onChange={handleSelectChange}
      >
        {targetSerialOptions.map((s) => {
          return (
            <SelectItem key={s} value={s}>
              {s ? s : "請選擇"}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const StatusTypeSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const statusType = reportData.status.type;
  // statusTypeOptionsTODO: 要根據 targetCategory 來決定值，且要等到 targetSerial 被選擇後才能選擇

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
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setStatusType.label", {
          ns: ["drawer"],
        })}
      </p>
      <Select
        label={t("addReport.content.select.setStatusType.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([statusType])}
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
    </>
  );
};

const StatusValueSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const statusValue = reportData.status.value;
  // statusValueOptions TODO: 要根據 statusType 來決定值，且要等到 statusType 被選擇後才能選擇

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
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.select.setStatusValue.label", {
          ns: ["drawer"],
        })}
      </p>
      <Select
        label={t("addReport.content.select.setStatusValue.label", {
          ns: ["drawer"],
        })}
        selectedKeys={new Set([statusValue])}
        onChange={handleSelectChange}
      >
        {Object.keys(poiStatusValue).map((s) => (
          <SelectItem key={s} value={s}>
            {t(poiStatusValueMessageKeys[s] || "", {
              ns: ["model"],
            })}
          </SelectItem>
        ))}
      </Select>
    </>
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
  const { data: cluster, isLoading: clusterLoading } = useGetClusterQuery(
    reportData.clusterId,
  ); // clusterloading 的話就載入 skelton

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }

    const latlng = { latitude: center.lat(), longitude: center.lng() };
    dispatch(updateAddReportData({ latlng }));
  };

  return (
    <div className="flex flex-col max-h-[calc(50vh-100px)]">
      <Skeleton
        isLoaded={!clusterLoading}
        classNames={{ base: "bg-white overflow-y-scroll" }}
      >
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
          <FloorSelect cluster={cluster!} />
        </div>
        {/* 回報類別 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <TargetCategorySelect cluster={cluster!} />
        </div>
        {/* 回報項目 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <TargetNameSelect cluster={cluster!} />
        </div>
        {/* 項目描述 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <TargetSerialSelect cluster={cluster!} />
        </div>
        {/* 回報狀態 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <StatusTypeSelect />
        </div>
        {/* 狀態描述 */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <StatusValueSelect />
        </div>

        <AddReportDrawerContentPhotos />
      </Skeleton>
    </div>
  );
};

export default AddReportDrawerContent;
