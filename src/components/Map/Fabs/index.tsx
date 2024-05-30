import React from "react";

import UserFab from "./UserFab";
import FacilityFilterFabs from "./FacilityFilterFab";
import LlmFabs from "./LlmFab";
import AddReportFab from "./AddReportFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <FacilityFilterFabs />
      <LlmFabs />
      <AddReportFab />
    </>
  );
};

export default Fabs;
