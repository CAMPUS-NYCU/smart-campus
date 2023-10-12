import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Button, Chip, Image } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
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
        ns: ["drawer"],
      })}
    </Chip>
  );
};

const PoiDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const selected = isCurrentDrawerParams("poi", searchParams);
  const id = selected ? getParamsFromDrawer("poi", searchParams).poiId : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });

  const handleDrawerClose = () => {
    resetDrawerParams(searchParams, setSearchParams);
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerClose}
      title={t("poi.title", {
        name: poi?.data.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          <div>
            {t("poi.content.texts.description", {
              description: poi?.data.description,
              ns: ["drawer"],
            })}
          </div>
          <div>
            {t("poi.content.texts.latlng", {
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
        <Button onClick={handleDrawerClose}>
          {t("poi.buttons.edit", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerClose}>
          {t("poi.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default PoiDrawer;
