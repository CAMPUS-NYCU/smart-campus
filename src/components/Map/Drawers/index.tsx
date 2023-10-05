import React from "react";

import AddReportDrawer from "../../Drawer/AddReportDrawer";
import ClusterDrawer from "../../Drawer/ClusterDrawer";
import PoiDrawer from "../../Drawer/PoiDrawer";

const Drawers: React.FC = () => {
  return (
    <>
      <AddReportDrawer />
      <ClusterDrawer />
      <PoiDrawer />
    </>
  );
};

export default Drawers;
