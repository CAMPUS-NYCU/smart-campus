import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Image, Input, Select, SelectItem } from "@nextui-org/react";

import {
  poiStatusType,
  poiStatusTypeMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusType } from "../../../models/poi";
import { IRootState } from "../../../store";
import { updateAddReportData } from "../../../store/report";
import noImage from "../../../assets/images/noImage.svg";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";

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
      label={t("editReport.content.select.setStatus.label", {
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
  const reportData = useSelector((state: IRootState) => state.report.data);
  const [urls, setUrls] = useState<string[]>([]);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    if (reportData?.photoPaths) {
      const fetchUrls = async () => {
        const urlPromises = reportData.photoPaths.map((path) =>
          getDownloadURL(ref(storage, path)),
        );
        const resolvedUrls = await Promise.all(urlPromises);
        setUrls(resolvedUrls);
      };

      fetchUrls();
    }
  }, [reportData, storage]);

  return (
    <div className="flex flex-row">
      {urls.length > 0 ? (
        urls.map((url) => <Image key={url} src={url} alt="" />)
      ) : (
        <Image src={noImage} alt="No image available" />
      )}
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
        value={reportData.target.serial || ""}
        isInvalid={!reportData.target.serial}
        variant="bordered"
      />
      <StatusSelect />
      <AddReportDrawerContentPhotos />
    </div>
  );
};

export default AddReportDrawerContent;
