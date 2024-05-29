import React from "react";

import UserFab from "./UserFab";
import UserLocationFab from "./UserLocationFab";
import FacilityFilterFabs from "./FacilityFilterFab";
import AddReportFab from "./AddReportFab";
import PoiFilterFabs from "./PoiFilterFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <UserLocationFab />
      <FacilityFilterFabs />
      <AddReportFab />
      <PoiFilterFabs />
    </>
  );
};

export default Fabs;
