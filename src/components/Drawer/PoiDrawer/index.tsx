import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Chip, Image } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { IRootState } from "../../../store";
import { editReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import { poiStatus, poiStatusMessageKeys } from "../../../constants/model/poi";
import { PoiStatus } from "../../../models/poi";

import Drawer from "..";

const PoiDrawerStatus: React.FC<{ status?: PoiStatus }> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Chip>
      {t(poiStatusMessageKeys[status || poiStatus.unknown] || "", {
        ns: ["model"],
      })}
    </Chip>
  );
};

const PoiDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected = !reportType && isCurrentDrawerParams("poi", searchParams);
  const id = selected ? getParamsFromDrawer("poi", searchParams).poiId : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });

  const handleDrawerConfirm = () => {
    if (!poi) {
      throw new Error("ClusterDrawer: poi not found");
    }

    dispatch(editReport(poi));
  };

  const handleDrawerDismiss = () => {
    resetDrawerParams(searchParams, setSearchParams);
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={t("poiDrawer.title", {
        name: poi?.data.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          <div>
            {t("poiDrawer.content.texts.description", {
              description: poi?.data.description,
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
          <PoiDrawerStatus status={poi?.data.status} />
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
