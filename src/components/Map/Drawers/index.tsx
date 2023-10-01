import React from "react";

import ClusterDrawer from "../../Drawer/ClusterDrawer";
import PoiDrawer from "../../Drawer/PoiDrawer";

const Drawers: React.FC = () => {
  return (
    <>
      <ClusterDrawer />
      <PoiDrawer />
    </>
  );
};

export default Drawers;
