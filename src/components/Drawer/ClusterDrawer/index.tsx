import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { IRootState } from "../../../store";
import { addReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";

const ClusterDrawer: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected =
    !reportType && isCurrentDrawerParams("cluster", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const { data: cluster } = useGetClusterQuery(id, {
    skip: !selected,
  });

  const clearMarkerRouteParams = () => {
    resetDrawerParams(searchParams, setSearchParams);
  };

  const handleDrawerConfirm = () => {
    if (!id) {
      throw new Error("ClusterDrawer: id is null");
    }

    dispatch(addReport(id));
  };

  const handleDrawerDismiss = () => {
    clearMarkerRouteParams();
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerDismiss}
      title={t("cluster.title", {
        name: cluster?.data.name,
        ns: ["drawer"],
      })}
      children={
        <div>
          <div>
            {t("cluster.content.texts.description", {
              description: cluster?.data.description,
              ns: ["drawer"],
            })}
          </div>
          <div>
            {t("cluster.content.texts.latlng", {
              latitude: cluster?.data.latlng.latitude,
              longitude: cluster?.data.latlng.longitude,
              ns: ["drawer"],
            })}
          </div>
        </div>
      }
      primaryButton={
        <Button onClick={handleDrawerConfirm}>
          {t("cluster.buttons.add", { ns: ["drawer"] })}
        </Button>
      }
      secondaryButton={
        <button onClick={handleDrawerDismiss}>
          {t("cluster.buttons.cancel", { ns: ["drawer"] })}
        </button>
      }
    />
  );
};

export default ClusterDrawer;
