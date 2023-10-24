import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, useDisclosure } from "@nextui-org/react";

import { useIsLoggedInQuery } from "../../../api/user";
import { useGetClusterQuery } from "../../../api/cluster";
import { IRootState } from "../../../store";
import { addReport } from "../../../store/report";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";
import Login from "../../modal/Login";

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

  const { data: isLoggedIn } = useIsLoggedInQuery();

  const loginDisclosure = useDisclosure();

  const clearMarkerRouteParams = () => {
    resetDrawerParams(searchParams, setSearchParams);
  };

  const handleDrawerConfirm = () => {
    if (isLoggedIn) {
      if (!id) {
        throw new Error("ClusterDrawer: id is null");
      }

      dispatch(addReport(id));
    } else {
      loginDisclosure.onOpen();
    }
  };

  const handleDrawerDismiss = () => {
    clearMarkerRouteParams();
  };

  return (
    <>
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

      <Login disclosure={loginDisclosure} />
    </>
  );
};

export default ClusterDrawer;
