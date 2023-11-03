import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetClusterQuery } from "../../../api/cluster";
import { useGetUserQuery } from "../../../api/user";
import { IRootState } from "../../../store";
import { openModal } from "../../../store/modal";
import { addReport, resetReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";

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
          <div>
            {t("clusterDrawer.content.texts.latlng", {
              latitude: cluster?.data.latlng.latitude,
              longitude: cluster?.data.latlng.longitude,
              ns: ["drawer"],
            })}
          </div>
        </div>
      }
      primaryButton={
        <Button onClick={handleDrawerConfirm}>
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
