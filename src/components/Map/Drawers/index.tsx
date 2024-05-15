import React from "react";

import AddReportDrawer from "../../Drawer/AddReportDrawer";
import EditReportDrawer from "../../Drawer/EditReportDrawer";
import PoiDrawer from "../../Drawer/PoiDrawer";

const Drawers: React.FC = () => {
  return (
    <>
      <AddReportDrawer />
      <EditReportDrawer />
      <PoiDrawer />
    </>
  );
};

export default Drawers;
