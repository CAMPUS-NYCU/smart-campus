import React from "react";

import UserFab from "./UserFab";
import FacilityFilterFabs from "./FacilityFilterFab";
import AddReportFab from "./AddReportFab";
import PoiFilterFabs from "./PoiFilterFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <FacilityFilterFabs />
      <AddReportFab />
      <PoiFilterFabs />
    </>
  );
};

export default Fabs;
