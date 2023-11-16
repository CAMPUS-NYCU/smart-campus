import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Chip, Image } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { useGetUserQuery } from "../../../api/user";
import { IRootState } from "../../../store";
import { openModal } from "../../../store/modal";
import { editReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  setupDrawerParams,
} from "../../../utils/routes/params";

import {
  poiStatusType,
  poiStatusTypeMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusType } from "../../../models/poi";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { firebaseApp } from "../../../utils/firebase";

import Drawer from "..";

const PoiDrawerStatus: React.FC<{ status?: PoiStatusType }> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Chip>
      {t(poiStatusTypeMessageKeys[status || poiStatusType.unknown] || "", {
        ns: ["model"],
      })}
    </Chip>
  );
};

const PoiDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = useSelector((state: IRootState) => state.report.type);

  const dispatch = useDispatch();

  const selected = !reportType && isCurrentDrawerParams("poi", searchParams);
  const id = selected ? getParamsFromDrawer("poi", searchParams).poiId : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });
  const { data: user } = useGetUserQuery();

  const handleDrawerConfirm = () => {
    if (!poi) {
      throw new Error("ClusterDrawer: poi not found");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(editReport(poi));
    }
  };

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
    if (poi?.data.photoUrls) {
      const fetchUrls = async () => {
        const urlPromises = poi.data.photoUrls.map((path) =>
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
        name: poi?.data.target.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          <div>
            {t("poiDrawer.content.texts.description", {
              description: poi?.data.target.serial,
              ns: ["drawer"],
            })}
          </div>
          <div>
            {t("poiDrawer.content.texts.latlng", {
              latitude: poi?.data.latlng.latitude,
              longitude: poi?.data.latlng.longitude,
              ns: ["drawer"],
            })}
          </div>
          <PoiDrawerStatus status={poi?.data.status.type} />
          <div className="flex flex-row">
            {urls.map((url) => (
              <Image key={url} src={url} alt="" />
            ))}
          </div>
        </div>
      }
      primaryButton={
        <Button onClick={handleDrawerConfirm}>
          {t("poiDrawer.buttons.edit", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerDismiss}>
          {t("poiDrawer.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default PoiDrawer;
