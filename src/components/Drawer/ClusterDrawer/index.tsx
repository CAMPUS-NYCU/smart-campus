import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Listbox,
  ListboxItem,
  Chip,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useGetUserQuery } from "../../../api/user";
import { useGetPoisQuery } from "../../../api/poi";
import { IRootState } from "../../../store";
import { openModal } from "../../../store/modal";
import { resetHightlightId, setHighlightId } from "../../../store/poi";
import { editReport, resetReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import { getClusterIcon } from "../../../constants/clusterIcon";
import noImage from "../../../assets/images/noImage.svg";
import Drawer from "..";
import Poi, { PoiData, Pois } from "../../../models/poi";
import {
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";
import { maps } from "../../../utils/googleMaps";
import {
  calculateDistance,
  compareByUpdatedTime,
  compareByTargetSerial,
} from "../../../constants/map";
import {
  sortingOptions,
  sortingMessages,
} from "../../../constants/sortingOptions";
import UIPoi, { UIPoiData, UIPois } from "../../../models/uiPoi";
import {
  resetFilterPoiFloors,
  resetFilterPoiStatuses,
  resetFilterPoiTargetNames,
} from "../../../store/filter";

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
              ? "border-3 border-primary bg-primary/50"
              : "border-1 border-secondary/50"
            // 42px is the height of the header and footer
            // 4 is the number of items in each row
            // 8 is the margin between items
            // so the total height is 50vh - 42px - 4 * 8 = 50vh - 74px
          }  h-[calc((50vh-74px)/4)] py-0 px-1.5`,
        }}
      >
        <div
          ref={containerRef}
          className="container flex flex-row py-0 h-[calc((50vh-74px)/4)]"
        >
          {/* the main information of the report */}
          <div className="flex flex-col shrink-0 justify-around basis-8/12">
            <div className="flex text-left flex-wrap flex-row">
              <div className="basis-0.5/12 align-middle">
                <img
                  src={getClusterIcon(poi.data.target.name)}
                  alt={"icon of" + poi.data.target.name}
                  className="inline mr-1 h-6"
                />
                <p className="text-sm inline font-bold whitespace-nowrap mr-1">{`${poi.data.target.category}/${poi.data.target.serial}`}</p>
              </div>
            </div>
            <div className="flex flex-row space-x-1">
              <div className="flex flex-row basis-3/12">
                <Chip
                  radius="sm"
                  classNames={{
                    content: "text-xs px-0.5",
                    base: "py-0 min-h-fit h-6 mr-1",
                  }}
                >
                  {poi.data.floor}
                </Chip>
                <p className="inline align-middle">
                  {t(poiStatusTypeMessageKeys[poi.data.status.type], {
                    ns: ["model"],
                  })}
                  ：
                  {t(poiStatusValueMessageKeys[poi.data.status.value], {
                    ns: ["model"],
                  })}
                </p>
              </div>
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

          {/* the edit button */}
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

          {/* the report images */}
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
    !reportType &&
    isCurrentDrawerParams("cluster", searchParams) &&
    !isCurrentDrawerParams("recommend", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const filteredFloors = useSelector((state: IRootState) => {
    return state.filter.filterPoiFloors;
  });

  const filteredTargetNames = useSelector((state: IRootState) => {
    return state.filter.filterPoiTargetNames;
  });

  const filteredStatuses = useSelector((state: IRootState) => {
    return state.filter.filterPoiStatuses;
  });

  const { data: poiList, isLoading: isPoiListLoading } = useGetPoisQuery(id);
  const [queriedPoiList, setQueriedPoiList] = React.useState<Pois>();

  React.useEffect(() => {
    if (!isPoiListLoading && poiList) {
      setQueriedPoiList(poiList);
    }
  }, [isPoiListLoading, poiList]);

  const uiPoiList: UIPois | null = React.useMemo(() => {
    if (queriedPoiList) {
      return Object.fromEntries(
        Object.entries(queriedPoiList).map(([poiId, poiData]) => {
          const isVisible =
            (filteredFloors.length === 0 ||
              filteredFloors.includes(poiData.floor)) &&
            (filteredTargetNames.length === 0 ||
              filteredTargetNames.includes(poiData.target.name)) &&
            (filteredStatuses.length === 0 ||
              filteredStatuses.includes(poiData.status.type));

          return [poiId, { ...poiData, isVisible } as UIPoiData];
        }),
      );
    } else {
      return null;
    }
  }, [filteredFloors, filteredStatuses, filteredTargetNames, queriedPoiList]);

  const handleDrawerDismiss = () => {
    resetDrawerParams(searchParams, setSearchParams);
    dispatch(resetFilterPoiFloors());
    dispatch(resetFilterPoiTargetNames());
    dispatch(resetFilterPoiStatuses());
  };

  const [sortingMethod, setSortingMethod] = useState(sortingOptions[0].key);
  const [sortingMessage, setSortingMessage] = useState(
    sortingMessages[0].message,
  );

  React.useEffect(() => {
    if (!isCurrentDrawerParams("cluster", searchParams)) {
      dispatch(resetReport());
    }
    if (
      isCurrentDrawerParams("cluster", searchParams) &&
      !isCurrentDrawerParams("recommend", searchParams)
    ) {
      dispatch(openModal("reportStart"));
    }
  }, [dispatch, searchParams]);

  const orderedPoiList: UIPoi[] = useMemo(() => {
    let result: UIPoi[] = [];

    if (uiPoiList) {
      result = Object.entries(uiPoiList).map(([id, data]) => ({
        id,
        data,
      }));

      if (sortingMethod === "time") {
        result.sort(compareByUpdatedTime);
      } else if (sortingMethod === "distance") {
        const mapCenter = maps.getCenter();
        const calCenter = {
          latlng: {
            latitude: mapCenter?.lat() || 0,
            longitude: mapCenter?.lng() || 0,
          },
        };

        result.sort((poi1: Poi, poi2: Poi) => {
          const distance1 = calculateDistance(
            calCenter.latlng,
            poi1.data.latlng,
          );
          const distance2 = calculateDistance(
            calCenter.latlng,
            poi2.data.latlng,
          );
          return distance1 - distance2;
        });
      } else if (sortingMethod === "name") {
        result.sort(compareByTargetSerial);
      } else {
        console.error("sorting method not found");
      }
    }

    return result;
  }, [uiPoiList, sortingMethod]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSortingMethod(e.target.value as string);
      setSortingMessage(
        sortingMessages.find((msg) => msg.key === e.target.value)?.message ??
          sortingMessages[0].message,
      );
    }
  };

  return (
    <Drawer
      isDraggable={true}
      open={selected}
      onClose={handleDrawerDismiss}
      title={t("clusterDrawer.title", {
        name: cluster?.data.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          {uiPoiList ? (
            orderedPoiList.map((poi) => {
              if (poi.data.isVisible) {
                return (
                  <PoiListItem
                    key={poi.id}
                    poi={{ id: poi.id, data: poi.data }}
                  />
                );
              } else {
                return <div key={poi.id} className="hidden"></div>;
              }
            })
          ) : (
            <></>
          )}
        </div>
      }
      primaryButton={
        <Select
          aria-label="Sorting Method"
          variant="bordered"
          selectedKeys={[sortingMethod]}
          classNames={{
            value: "text-xs",
            innerWrapper: "pt-0",
            trigger: "py-0 h-7 min-h-fit bg-primary",
            base: "min-w-fit w-full border-0",
            listboxWrapper: "min-w-fit",
          }}
          onChange={handleSelectionChange}
        >
          {sortingOptions.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              {t(option.label, { ns: ["drawer"] })}
            </SelectItem>
          ))}
        </Select>
      }
      description={t(sortingMessage, { ns: ["drawer"] })}
    />
  );
};

export default ClusterDrawer;
