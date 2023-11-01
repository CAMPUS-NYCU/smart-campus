import React from "react";
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
  poiStatusName,
  poiStatusNameMessageKeys,
} from "../../../constants/model/poi";
import { PoiStatusName } from "../../../models/poi";

import Drawer from "..";

const PoiDrawerStatus: React.FC<{ status?: PoiStatusName }> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Chip>
      {t(poiStatusNameMessageKeys[status || poiStatusName.unknown] || "", {
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
              description: poi?.data.target.description,
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
          <PoiDrawerStatus status={poi?.data.status.name} />
          <div className="flex flex-row">
            {poi?.media.photoUrls.map((url) => (
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
