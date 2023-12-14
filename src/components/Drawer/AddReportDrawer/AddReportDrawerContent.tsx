import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input, Select, SelectItem, Skeleton } from "@nextui-org/react";

import {
  poiObjectStatusTypeSelect,
  poiSpaceStatusTypeSelect,
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
  poiStatusValueSelect,
} from "../../../constants/model/poi";
import Cluster from "../../../models/cluster/index";
import { useGetClusterQuery } from "../../../api/cluster";
import { PoiStatusType, PoiStatusValue } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import { getOptions } from "../../../constants/createOptions";
import poiAddDrawerFloor from "../../../assets/images/poiAddDrawerFloor.svg";
import poiAddDrawerImage from "../../../assets/images/poiAddDrawerImage.svg";
import poiAddDrawerLocation from "../../../assets/images/poiAddDrawerLocation.svg";
import poiAddDrawerStatusType from "../../../assets/images/poiAddDrawerStatusType.svg";
import poiAddDrawerStatusValue from "../../../assets/images/poiAddDrawerStatusValue.svg";
import poiAddDrawerTargetCategory from "../../../assets/images/poiAddDrawerTargetCategory.svg";
import poiAddDrawerTargetName from "../../../assets/images/poiAddDrawerTargetName.svg";
import poiAddDrawerTargetSerial from "../../../assets/images/poiAddDrawerTargetSerial.svg";
import poiAddDrawerUploadImages from "../../../assets/images/poiAddDrawerUploadImages.svg";

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
            type: "",
            value: "",
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
        aria-label="set floor"
        selectedKeys={new Set([floor])}
        onChange={handleSelectChange}
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
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
  let targetCategoryOptions: string[]; // decided by floor

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
            type: "",
            value: "",
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
        aria-label="set target category"
        selectedKeys={new Set([targetCategory])}
        onChange={handleSelectChange}
        isDisabled={reportData.floor ? false : true}
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
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

  let targetNameOptions: string[]; // decided by floor and targetCategory

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
            type: "",
            value: "",
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
        aria-label="set target name"
        selectedKeys={new Set([targetName])}
        onChange={handleSelectChange}
        isDisabled={
          reportData.floor && reportData.target.category ? false : true
        }
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
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
  let targetSerialOptions: string[]; // decided by floor, targetCategory and targetName

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
            type: "",
            value: "",
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
        aria-label="set target serial"
        selectedKeys={new Set([targetSerial])}
        onChange={handleSelectChange}
        isDisabled={
          reportData.floor &&
          reportData.target.category &&
          reportData.target.name
            ? false
            : true
        }
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
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
  let statusTypeOptions: string[]; // decided by targetCategory, and can only be selectable when targetSerial is set

  if (reportData.target.category === "物體" && reportData.target.serial) {
    statusTypeOptions = poiObjectStatusTypeSelect;
  } else if (
    reportData.target.category === "空間" &&
    reportData.target.serial
  ) {
    statusTypeOptions = poiSpaceStatusTypeSelect;
  } else {
    statusTypeOptions = [""];
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          status: {
            ...reportData.status,
            type: e.target.value as PoiStatusType,
            value: "",
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
        aria-label="set status type"
        selectedKeys={new Set([statusType])}
        onChange={handleSelectChange}
        isDisabled={
          reportData.floor &&
          reportData.target.name &&
          reportData.target.category &&
          reportData.target.serial
            ? false
            : true
        }
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
      >
        {statusTypeOptions.map((s) => (
          <SelectItem key={s} value={s}>
            {s === ""
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
  const statusValueOption = poiStatusValueSelect[reportData.status.type]; // decided by statusType, and can only be selectable when statusType is set

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
        aria-label="set status value"
        selectedKeys={new Set([statusValue])}
        onChange={handleSelectChange}
        isDisabled={
          reportData.floor &&
          reportData.target.name &&
          reportData.target.category &&
          reportData.target.serial &&
          reportData.status.type !== ""
            ? false
            : true
        }
        classNames={{
          value: "text-xs",
          innerWrapper: "pt-0",
          trigger: "py-0 h-7 min-h-fit bg-primary",
          base: "min-w-fit w-[50%]",
        }}
      >
        {statusValueOption?.map((s) => (
          <SelectItem key={s} value={s}>
            {s === ""
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
    <>
      <div className="flex flex-col basis-10/12">
        <div className="flex flex-row">
          <label className="bg-textBtn rounded-lg min-w-fit h-fit px-2 py-1 items-center hover:bg-textBtnHover cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
            <div className="flex flex-row">
              <Image src={poiAddDrawerUploadImages} />
              <p className="text-xs font-bold pt-0.5 ml-0.5">上傳圖片</p>
            </div>
          </label>
        </div>
        <div className="flex flex-row mt-1">
          <div className="flex flex-row justify-center basis-12/12 overflow-y-hidden">
            {reportData.photoPaths.map((url) => (
              <Image radius="none" key={url} src={url} alt="" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const AddReportDrawerContent: React.FC = () => {
  const { t } = useTranslation();

  const reportData = useSelector((state: IRootState) => state.report.data);
  const { data: cluster, isLoading: clusterLoading } = useGetClusterQuery(
    reportData.clusterId,
  ); // if cluster is loading, load skelton

  return (
    <div className="flex flex-col max-h-[calc(50vh-80px)] mt-1">
      {clusterLoading ? (
        <Skeleton classNames={{ base: "bg-white overflow-y-scroll" }} />
      ) : (
        <>
          {/* report location */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12 px-1">
              <Image radius="none" src={poiAddDrawerLocation} alt="location" />
            </div>
            <p className="basis-2/12 text-xs font-bold">
              {t("addReport.content.text.setLocation", {
                ns: ["drawer"],
              })}
            </p>
            <Input
              aria-label="set location"
              placeholder={cluster?.data.name}
              variant="underlined"
              classNames={{ base: "basis-6/12" }}
              isReadOnly
            />
          </div>
          {/* report floor */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image radius="none" src={poiAddDrawerFloor} alt="floor" />
            </div>
            <FloorSelect cluster={cluster!} />
          </div>
          {/* report target category */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image
                radius="none"
                src={poiAddDrawerTargetCategory}
                alt="target category"
              />
            </div>
            <TargetCategorySelect cluster={cluster!} />
          </div>
          {/* report target name */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image
                radius="none"
                src={poiAddDrawerTargetName}
                alt="target name"
              />
            </div>
            <TargetNameSelect cluster={cluster!} />
          </div>
          {/* report target serial */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image
                radius="none"
                src={poiAddDrawerTargetSerial}
                alt="target serial"
              />
            </div>
            <TargetSerialSelect cluster={cluster!} />
          </div>
          {/* report status type */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image
                radius="none"
                src={poiAddDrawerStatusType}
                alt="status type"
              />
            </div>
            <StatusTypeSelect />
          </div>
          {/* report status value */}
          <div className="flex flex-row space-x-1 mt-1 items-center">
            <div className="basis-0.5/12">
              <Image
                radius="none"
                src={poiAddDrawerStatusValue}
                alt="status value"
              />
            </div>
            <StatusValueSelect />
          </div>
          {/* report images */}
          <div className="flex flex-row space-x-1 mt-1 items-center whitespace-normal">
            <div className="basis-0.5/12 shrink-0">
              <Image radius="none" src={poiAddDrawerImage} alt="image" />
            </div>
            <AddReportDrawerContentPhotos />
          </div>
        </>
      )}
    </div>
  );
};

export default AddReportDrawerContent;
