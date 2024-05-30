import React from "react";

import UserFab from "./UserFab";
import UserLocationFab from "./UserLocationFab";
import FacilityFilterFabs from "./FacilityFilterFab";
import LlmFabs from "./LlmFab";
import AddReportFab from "./AddReportFab";
import PoiFilterFabs from "./PoiFilterFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <UserLocationFab />
      <FacilityFilterFabs />
      <LlmFabs />
      <AddReportFab />
      <PoiFilterFabs />
    </>
  );
};

export default Fabs;
