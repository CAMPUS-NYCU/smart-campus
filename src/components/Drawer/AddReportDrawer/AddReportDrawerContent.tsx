import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input, Select, SelectItem } from "@nextui-org/react";

import {
  poiObjectStatusTypeSelect,
  poiSpaceStatusTypeSelect,
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
  poiStatusValueSelect,
} from "../../../constants/model/poi";
import { PoiStatusType, PoiStatusValue } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import poiAddDrawerFloor from "../../../assets/images/poiAddDrawerFloor.svg";
import poiAddDrawerImage from "../../../assets/images/poiAddDrawerImage.svg";
import poiAddDrawerLocation from "../../../assets/images/poiAddDrawerLocation.svg";
import poiAddDrawerStatusType from "../../../assets/images/poiAddDrawerStatusType.svg";
import poiAddDrawerStatusValue from "../../../assets/images/poiAddDrawerStatusValue.svg";
import poiAddDrawerTargetCategory from "../../../assets/images/poiAddDrawerTargetCategory.svg";
import poiAddDrawerTargetName from "../../../assets/images/poiAddDrawerTargetName.svg";
import poiAddDrawerUploadImages from "../../../assets/images/poiAddDrawerUploadImages.svg";

import floorSelctions from "../../../assets/data/options/selections/floor.json";
import targetCategorySelections from "../../../assets/data/options/selections/target-category.json";
import targetNameSelections from "../../../assets/data/options/selections/target-name.json";

const FloorSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const floor = reportData.floor;
  const floorOptions = floorSelctions;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          floor: e.target.value,
          target: {
            ...reportData.target,
            category: "",
            name: "",
            description: "",
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
              {s
                ? s
                : t("addReport.content.select.placeHolder", {
                    ns: ["drawer"],
                  })}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const TargetCategorySelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const targetCategory = reportData.target.category;
  const targetCategoryOptions = targetCategorySelections;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch(
        updateAddReportData({
          target: {
            ...reportData.target,
            category: e.target.value,
            name: "",
            description: "",
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
              {s
                ? s
                : t("addReport.content.select.placeHolder", {
                    ns: ["drawer"],
                  })}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
};

const TargetNameSelect: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);
  const targetName = reportData.target.name;
  const targetNameWithCategory = targetNameSelections;
  let targetNameOptions: string[]; // decided by targetCategory

  if (reportData.floor && reportData.target.category) {
    targetNameOptions = targetNameWithCategory.find(
      (n) => n.category === reportData.target.category,
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
            description: "",
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
              {s
                ? s
                : t("addReport.content.select.placeHolder", {
                    ns: ["drawer"],
                  })}
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
  let statusTypeOptions: string[]; // decided by targetCategory

  if (reportData.target.category === "物體") {
    statusTypeOptions = poiObjectStatusTypeSelect;
  } else if (reportData.target.category === "空間") {
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
          reportData.target.category
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
              ? t("addReport.content.select.placeHolder", {
                  ns: ["drawer"],
                })
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
              ? t("addReport.content.select.placeHolder", {
                  ns: ["drawer"],
                })
              : t(poiStatusValueMessageKeys[s] || "", {
                  ns: ["model"],
                })}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

const StatusDescriptionAdd: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateAddReportData({
        target: {
          ...reportData.target,
          description: e.target.value,
        },
      }),
    );
  };

  return (
    <>
      <p className="basis-2/12 text-xs font-bold">
        {t("addReport.content.text.setDescription", {
          ns: ["drawer"],
        })}
      </p>
      <Input
        aria-label="set description"
        placeholder={t("addReport.content.inputs.description.placeholder", {
          ns: ["drawer"],
        })}
        variant="underlined"
        value={reportData.target.description || ""}
        onChange={handleInputChange}
        classNames={{ base: "basis-6/12" }}
      />
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

  return (
    <div className="flex flex-col max-h-[calc(50vh-80px)] mt-1">
      <>
        {/* report location */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12 px-1">
            <Image radius="none" src={poiAddDrawerLocation} alt="location" />
          </div>
          <div className="flex flex-row basis-11/12 pl-1.5 mb-2">
            <p className="text-md font-bold text-newLocation">
              {t("addReport.content.text.flagInsruction", {
                ns: ["drawer"],
              })}
            </p>
          </div>
        </div>
        {/* report floor */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image radius="none" src={poiAddDrawerFloor} alt="floor" />
          </div>
          <FloorSelect />
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
          <TargetCategorySelect />
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
          <TargetNameSelect />
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
        {/* report description */}
        <div className="flex flex-row space-x-1 mt-1 items-center">
          <div className="basis-0.5/12">
            <Image
              radius="none"
              src={poiAddDrawerStatusValue}
              alt="description"
            />
          </div>
          <StatusDescriptionAdd />
        </div>
        {/* report images */}
        <div className="flex flex-row space-x-1 mt-1 items-center whitespace-normal">
          <div className="basis-0.5/12 shrink-0">
            <Image radius="none" src={poiAddDrawerImage} alt="image" />
          </div>
          <AddReportDrawerContentPhotos />
        </div>
      </>
    </div>
  );
};

export default AddReportDrawerContent;
