import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Chip, Image } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { useGetClusterQuery } from "../../../api/cluster";
import { IRootState } from "../../../store";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  setupDrawerParams,
} from "../../../utils/routes/params";

import noImage from "../../../assets/images/noImage.svg";
import poiDrawerLocation from "../../../assets/images/poiDrawerLocation.svg";
import poiDrawerTargetSerial from "../../../assets/images/poiDrawerTargetSerial.svg";
import poiDrawerStatusType from "../../../assets/images/poiDrawerStatusType.svg";
import {
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusType, PoiStatusValue } from "../../../models/poi";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";

import Drawer from "..";

const PoiDrawerStatus: React.FC<{
  statusType?: PoiStatusType | "";
  statusValue?: PoiStatusValue | "";
}> = ({ statusType, statusValue }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row space-x-1 mt-1 items-center">
      <div className="basis-0.5/12">
        <Image src={poiDrawerStatusType} alt="status" />
      </div>
      <Chip
        radius="sm"
        classNames={{
          content: "px-0.5 text-xs",
        }}
      >
        {`${t(poiStatusTypeMessageKeys[statusType || ""], {
          ns: ["model"],
        })}:${t(poiStatusValueMessageKeys[statusValue || ""], {
          ns: ["model"],
        })}`}
      </Chip>
    </div>
  );
};

const PoiDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected = !reportType && isCurrentDrawerParams("poi", searchParams);
  const id = selected ? getParamsFromDrawer("poi", searchParams).poiId : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });
  const { data: cluster } = useGetClusterQuery(poi?.data.clusterId || "");

  const handleDrawerDismiss = () => {
    if (!poi) {
      throw new Error("PoiDrawer: poi not found");
    } else {
      setupDrawerParams<"cluster">(
        { clusterId: poi?.data.clusterId },
        searchParams,
        setSearchParams,
      );
    }
  };

  const [urls, setUrls] = useState<string[]>([]);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    if (poi?.data.photoPaths) {
      const fetchUrls = async () => {
        const urlPromises = poi.data.photoPaths.map((path) =>
          getDownloadURL(ref(storage, path)),
        );
        const resolvedUrls = await Promise.all(urlPromises);
        setUrls(resolvedUrls);
      };

      fetchUrls();
    }
  }, [poi, storage]);

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={t("poiDrawer.title", {
        name: `${poi?.data.target.category}/${poi?.data.target.name}`,
        ns: ["drawer"],
      })}
      children={
        <div className="flex flex-col max-h-[calc(50vh-64px)]">
          <div className="flex flex-row justify-center basis-6/12 overflow-y-hidden">
            {urls.length > 0 ? (
              urls.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="Images of this report"
                  classNames={{
                    wrapper: "justify-center flex",
                    img: "h-[100%]",
                  }}
                />
              ))
            ) : (
              <Image
                src={noImage}
                alt="No image available"
                classNames={{
                  wrapper: "justify-center flex",
                  img: "h-[100%]",
                }}
              />
            )}
          </div>

          <div className="basis-6/12">
            {/* the fist row：location & floor */}
            <div className="flex flex-row space-x-1 mt-1 items-center">
              <div className="basis-0.5/12">
                <Image src={poiDrawerLocation} alt="location and floor" />
              </div>
              <Chip radius="sm" classNames={{ content: "px-0.5 text-xs" }}>
                {t("poiDrawer.content.texts.description", {
                  description: cluster?.data.name || "",
                  ns: ["drawer"],
                })}
              </Chip>
              <Chip radius="sm" classNames={{ content: "px-0.5 text-xs" }}>
                {poi?.data.floor}
              </Chip>
            </div>

            {/* the second row：target serial */}
            <div className="flex flex-row space-x-1 mt-1 items-center">
              <div className="basis-0.5/12">
                <Image
                  src={poiDrawerTargetSerial}
                  alt="target serial of this report"
                />
              </div>
              <Chip radius="sm" classNames={{ content: "px-0.5 text-xs" }}>
                {poi?.data.target.serial}
              </Chip>
            </div>

            {/* the third row：status */}
            <PoiDrawerStatus
              statusType={poi?.data.status.type}
              statusValue={poi?.data.status.value}
            />

            {/* the fourth row：updatedBy &updatedAt */}
            <div className="fixed bottom-1 right-3 flex w-full flex-row mt-1 items-center justify-end">
              <p className="text-xs text-secondary">
                {t("poiDrawer.content.texts.updatedAt", {
                  updatedAt: poi?.data.updatedAt
                    ? poi.data.updatedAt
                    : poi?.data.createdAt,
                  ns: ["drawer"],
                })}
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default PoiDrawer;
