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
  poiObjectStatusTypeSelect,
  poiSpaceStatusTypeSelect,
  poiStatusType,
  poiStatusTypeMessageKeys,
  poiStatusValue,
  poiStatusValueMessageKeys,
  poiStatusValueSelect,
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
          target: {
            ...reportData.target,
            category: "",
            name: "",
            serial: "",
          },
          status: {
            ...reportData.status,
            type: poiStatusType.unknown as PoiStatusType,
          },
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
  let targetCategoryOptions: string[]; // 要根據 floor 來決定值

  if (reportData.floor) {
    targetCategoryOptions = getOptions(
      cluster?.data.name || "",
    ).targetCategory.find((c) => c.floor === reportData.floor)?.category || [
      "",
    ];
  } else {
    targetCategoryOptions = [""];
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            category: e.target.value,
            name: "",
            serial: "",
          },
          status: {
            ...reportData.status,
            type: poiStatusType.unknown as PoiStatusType,
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

  let targetNameOptions: string[]; // 要根據 floor, targetCategory 來決定值

  if (reportData.floor && reportData.target.category) {
    targetNameOptions = getOptions(cluster?.data.name || "").targetName.find(
      (n) =>
        n.floor === reportData.floor &&
        n.category === reportData.target.category,
    )?.name || [""];
  } else {
    targetNameOptions = [""];
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            name: e.target.value,
            serial: "",
          },
          status: {
            ...reportData.status,
            type: poiStatusType.unknown as PoiStatusType,
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
  let targetSerialOptions: string[]; // 要根據 floor, targetCategory, targetName 來決定值

  if (
    reportData.floor &&
    reportData.target.category &&
    reportData.target.name
  ) {
    targetSerialOptions = getOptions(
      cluster?.data.name || "",
    ).targetSerial.find(
      (s) =>
        s.floor === reportData.floor &&
        s.category === reportData.target.category &&
        s.name === reportData.target.name,
    )?.serial || [""];
  } else {
    targetSerialOptions = [""];
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            serial: e.target.value,
          },
          status: {
            ...reportData.status,
            type: poiStatusType.unknown as PoiStatusType,
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
  let statusTypeOptions: string[]; // 要根據 targetCategory 來決定值，且要等到 targetSerial 被選擇後才能選擇

  if (reportData.target.category === "物體" && reportData.target.serial) {
    statusTypeOptions = poiObjectStatusTypeSelect;
  } else if (
    reportData.target.category === "空間" &&
    reportData.target.serial
  ) {
    statusTypeOptions = poiSpaceStatusTypeSelect;
  } else {
    statusTypeOptions = ["unknown"];
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          status: {
            ...reportData.status,
            type: e.target.value as PoiStatusType,
            value: poiStatusValue.unknown as PoiStatusValue,
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
        {statusTypeOptions.map((s) => (
          <SelectItem key={s} value={s}>
            {s === "unknown"
              ? "請選擇"
              : t(poiStatusTypeMessageKeys[s] || "", {
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
  const statusValueOption = poiStatusValueSelect[reportData.status.type]; // 要根據 statusType 來決定值，且要等到 statusType 被選擇後才能選擇

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
      {clusterLoading ? (
        <Skeleton classNames={{ base: "bg-white overflow-y-scroll" }} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AddReportDrawerContent;
