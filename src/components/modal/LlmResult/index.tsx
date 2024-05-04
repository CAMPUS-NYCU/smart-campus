import {
  Button,
  Chip,
  Image,
  Listbox,
  ListboxItem,
  Skeleton,
} from "@nextui-org/react";
import { IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../store/modal";
import { setRecommandContributions } from "../../../store/llm";
import Drawer from "../../Drawer";
import {
  getParamsFromDrawer,
  setupDrawerParams,
} from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../api/user";
import { addReport, editReport } from "../../../store/report";
import { useCallback, useEffect, useState } from "react";
import { useLazyGetPoiQuery } from "../../../api/poi";
import Poi, { PoiData } from "../../../models/poi";
import { useTranslation } from "react-i18next";
import React from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";
import { resetHightlightId, setHighlightId } from "../../../store/poi";
import { getClusterIcon } from "../../../constants/clusterIcon";
import noImage from "../../../assets/images/noImage.svg";
import {
  poiStatusTypeMessageKeys,
  poiStatusValueMessageKeys,
} from "../../../constants/model/poi";

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
          }  h-[calc((50vh-100px)/4)] py-0 px-1.5`,
        }}
      >
        <div
          ref={containerRef}
          className="container flex flex-row py-0 h-[calc((50vh-100px)/4)]"
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

const LlmResult: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: user } = useGetUserQuery();
  const [getPoi] = useLazyGetPoiQuery();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmResult"],
  );

  const recommandContributions = useSelector(
    (state: IRootState) => state.llm.recommandContributions,
  );

  const [recommandPois, setRecommandPois] = useState<Poi[]>([]);

  const fetchData = useCallback(
    async (recommandContributions: string[]) => {
      const tasks = recommandContributions.map((contribution) => {
        return getPoi(contribution)
          .unwrap()
          .then((res) => {
            if (res === null) throw new Error("No recommand poi found.");
            else {
              return res;
            }
          });
      });
      const res = await Promise.all(tasks);
      return res;
    },
    [getPoi],
  );

  useEffect(() => {
    fetchData(recommandContributions).then((res) => {
      setRecommandPois(res);
    });
  }, [fetchData, recommandContributions]);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    // will also clear recommandPois
    dispatch(setRecommandContributions([]));
    setupDrawerParams<"cluster">({ clusterId }, searchParams, setSearchParams);
    dispatch(closeModal("llmResult"));
  };

  const handlePoiEdit = () => {
    if (!clusterId) {
      throw new Error("ClusterDrawer: id is null");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(addReport({ clusterId: clusterId, createdBy: user?.id }));
      dispatch(closeModal("llmResult"));
    }
  };
  console.log("Result infos", recommandPois);

  return (
    <Drawer
      open={modalOpen}
      onClose={handleCloseModal}
      title={"haha"}
      children={
        <div>
          {recommandPois.length > 0 ? (
            recommandPois.map((poi) => {
              return (
                <PoiListItem
                  key={poi.id}
                  poi={{ id: poi.id, data: poi.data }}
                />
              );
              // <div key={index}>{poi.data.clusterId}</div>
            })
          ) : (
            <Skeleton className="w-full h-[30vh] rounded-md" />
          )}
        </div>
      }
      primaryButton={
        <Button
          radius="full"
          className="bg-primary h-fit px-2 py-1.5"
          onClick={handlePoiEdit}
        >
          新增回報
        </Button>
      }
    />
  );
};

export default LlmResult;
