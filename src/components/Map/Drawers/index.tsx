import React from "react";

import AddReportDrawer from "../../Drawer/AddReportDrawer";
import ClusterDrawer from "../../Drawer/ClusterDrawer";
import EditReportDrawer from "../../Drawer/EditReportDrawer";
import PoiDrawer from "../../Drawer/PoiDrawer";
import LlmResult from "../../modal/LlmResult";

const Drawers: React.FC = () => {
  return (
    <>
      <AddReportDrawer />
      <ClusterDrawer />
      <EditReportDrawer />
      <PoiDrawer />
      <LlmResult />
    </>
  );
};

export default Drawers;
