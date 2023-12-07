import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Listbox, ListboxItem, Chip, Image } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useGetUserQuery } from "../../../api/user";
import { useGetPoisQuery } from "../../../api/poi";
import { IRootState } from "../../../store";
import { openModal } from "../../../store/modal";
import { resetHightlightId, setHighlightId } from "../../../store/poi";
import { addReport, editReport, resetReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import noImage from "../../../assets/images/noImage.svg";
import Drawer from "..";
import Poi, { PoiData } from "../../../models/poi";
import {
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import { statusColor } from "../../../constants/statusStyle";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";
import { getEntry } from "../../../constants/entry";
import { calculateDistance } from "../../../constants/map";
import { EntryData } from "../../../models/entry";

interface PoiListItemProps {
  poi: {
    id: string;
    data: PoiData;
  };
}

const PoiListItem: React.FC<PoiListItemProps> = (props) => {
  const { poi } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const highlightId = useSelector((state: IRootState) => state.poi.highlightId);

  const { data: user } = useGetUserQuery();

  const dispatch = useDispatch();

  const handlePoiEdit = () => {
    if (!poi) {
      throw new Error("ClusterDrawer: poi not found");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(editReport(poi));
    }
  };

  const handlePoiHighlight = () => {
    dispatch(setHighlightId(poi.id));
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

  useEffect(() => {
    if (highlightId === poi.id) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [dispatch, highlightId, poi.id]);

  useEffect(() => {
    return () => {
      dispatch(resetHightlightId());
    };
  }, [dispatch]);

  return (
    <Listbox aria-label="Actions" onAction={handlePoiHighlight}>
      <ListboxItem
        key={poi.id}
        textValue={`list item of ${poi.id}`}
        classNames={{
          base: `${
            highlightId === poi.id
              ? "border-3 border-secondary"
              : "border-1 border-secondary/50"
          }  h-[calc((50vh-100px)/4)] py-0 px-1.5`,
        }}
      >
        <div
          ref={containerRef}
          className="container flex flex-row py-0 h-[calc((50vh-100px)/4)]"
        >
          {/* 主要資訊列 */}
          <div className="flex flex-col shrink-0 justify-around basis-8/12">
            <div className="flex text-left flex-wrap flex-row">
              <p className="text-xs font-bold whitespace-nowrap mr-1">{`${poi.data.target.category}/${poi.data.target.name}`}</p>
              <p className="text-xs whitespace-nowrap text-secondary">
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
              onClick={handlePoiEdit}
            >
              {t("clusterDrawer.buttons.edit", { ns: ["drawer"] })}
            </Button>
          </div>

          {/* 圖片 */}
          <div className="flex flex-col justify-center basis-3/12 px-0.5 overflow-y-hidden">
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

  const handlePoiEdit = () => {
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

  const targetEntry: EntryData | null = useMemo(() => {
    if (cluster) {
      return getEntry(cluster.data.name);
    } else {
      return null;
    }
  }, [cluster]);

  const orderedPoiList: Poi[] = useMemo(() => {
    let result: Poi[] = [];

    if (poiList && targetEntry) {
      result = Object.entries(poiList).map(([id, data]) => ({
        id,
        data,
      }));
      result.sort((poi1: Poi, poi2: Poi) => {
        const distance1 = calculateDistance(
          targetEntry.latlng,
          poi1.data.latlng,
        );
        const distance2 = calculateDistance(
          targetEntry.latlng,
          poi2.data.latlng,
        );
        return distance1 - distance2;
      });
    }

    return result;
  }, [poiList, targetEntry]);

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
          {poiList && targetEntry ? (
            orderedPoiList.map((poi) => {
              return (
                <PoiListItem
                  key={poi.id}
                  poi={{ id: poi.id, data: poi.data }}
                />
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
          onClick={handlePoiEdit}
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
