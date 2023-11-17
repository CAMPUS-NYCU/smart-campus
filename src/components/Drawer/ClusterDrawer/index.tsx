import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Listbox, ListboxItem, Chip, Image } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useGetUserQuery } from "../../../api/user";
import { useGetPoisQuery } from "../../../api/poi";
import { IRootState } from "../../../store";
import { openModal } from "../../../store/modal";
import { addReport, resetReport, editReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";
import { PoiData } from "../../../models/poi";
import {
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import statusColor from "../../../constants/statusColor";
import noImage from "../../../assets/images/noImage.svg";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";

interface PoiListItemProps {
  poi: {
    id: string;
    data: PoiData;
  };
}

const PoiListItem: React.FC<PoiListItemProps> = (props) => {
  const { poi } = props;

  const { t } = useTranslation();

  const { data: user } = useGetUserQuery();

  const dispatch = useDispatch();

  const handleDrawerConfirm = () => {
    if (!poi) {
      throw new Error("ClusterDrawer: poi not found");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(editReport(poi));
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
    <Listbox
      aria-label="Actions"
      onAction={(key) => alert(`TODO: highlight poi id: ${key}`)}
    >
      <ListboxItem
        key={poi.id}
        textValue={`list item of ${poi.id}`}
        classNames={{
          base: "border-1 border-secondary/50 h-fit py-0",
        }}
      >
        <div className="container flex flex-row justify-around space-x-0.5 py-0 h-max-[calc((50vh-100px)/4)]">
          {/* 主要資訊列 */}
          <div className="flex flex-col shrink-0 justify-around basis-7/12">
            <div className="flex text-left flex-wrap flex-row">
              <p className="text-xs font-bold whitespace-normal mr-1">{`${poi.data.target.category}/${poi.data.target.name}`}</p>
              <p className="text-xs whitespace-normal text-secondary">
                {poi.data.target.serial}
              </p>
            </div>
            <div className="flex flex-row space-x-1">
              <Chip radius="sm" classNames={{ content: "text-xs px-0.5" }}>
                {poi.data.floor}
              </Chip>
              <Chip
                radius="sm"
                classNames={{
                  content: "px-0.5 whitespace-normal text-xs",
                  base: statusColor(poi.data.status.type),
                }}
              >
                {t(poiStatusTypeMessageKeys[poi.data.status.type], {
                  ns: ["model"],
                })}
                :
                {t(poiStatusValueMessageKeys[poi.data.status.value], {
                  ns: ["model"],
                })}
              </Chip>
            </div>
            <div className="flex flex-row space-x-1 text-xs">
              {t("clusterDrawer.content.texts.updatedAt", {
                updatedAt: poi?.data.updatedAt
                  ? poi.data.updatedAt
                  : poi.data.createdAt,
                ns: ["drawer"],
              })}
            </div>
          </div>

          {/* 編輯按鈕 */}
          <div className="flex flex-col justify-end basis-1/12 py-1.5">
            <Button
              radius="full"
              size="sm"
              className="bg-primary min-w-fit h-fit px-2 py-1"
              onClick={handleDrawerConfirm}
            >
              {t("clusterDrawer.buttons.edit", { ns: ["drawer"] })}
            </Button>
          </div>

          {/* 圖片 */}
          <div className="flex flex-col justify-center basis-2/12">
            <Image
              radius="none"
              src={urls[urls.length - 1] || noImage}
              alt="poi image in list"
            />
          </div>
        </div>
      </ListboxItem>
    </Listbox>
  );
};

const ClusterDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = useSelector((state: IRootState) => state.report.type);

  const dispatch = useDispatch();

  const selected =
    !reportType && isCurrentDrawerParams("cluster", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });
  const { data: user } = useGetUserQuery();

  const { data: poiList } = useGetPoisQuery(id);

  const handleDrawerConfirm = () => {
    if (!id) {
      throw new Error("ClusterDrawer: id is null");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(addReport({ clusterId: id, createdBy: user?.id }));
    }
  };

  const handleDrawerDismiss = () => {
    resetDrawerParams(searchParams, setSearchParams);
  };

  React.useEffect(() => {
    if (!isCurrentDrawerParams("cluster", searchParams)) {
      dispatch(resetReport());
    }
  }, [dispatch, searchParams]);

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={t("clusterDrawer.title", {
        name: cluster?.data.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          {poiList ? (
            Object.keys(poiList).map((poiId) => {
              const poiData = poiList[poiId];
              return (
                <PoiListItem key={poiId} poi={{ id: poiId, data: poiData }} />
              );
            })
          ) : (
            <></>
          )}
        </div>
      }
      primaryButton={
        <Button
          radius="full"
          className="bg-primary h-fit px-2 py-1.5"
          onClick={handleDrawerConfirm}
        >
          {t("clusterDrawer.buttons.add", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerDismiss}>
          {t("clusterDrawer.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default ClusterDrawer;
