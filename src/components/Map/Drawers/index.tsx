import React from "react";

import AddReportDrawer from "../../Drawer/AddReportDrawer";
import ClusterDrawer from "../../Drawer/ClusterDrawer";
import EditReportDrawer from "../../Drawer/EditReportDrawer";
import PoiDrawer from "../../Drawer/PoiDrawer";

const Drawers: React.FC = () => {
  return (
    <>
      <AddReportDrawer />
      <ClusterDrawer />
      <EditReportDrawer />
      <PoiDrawer />
    </>
  );
};

export default Drawers;
