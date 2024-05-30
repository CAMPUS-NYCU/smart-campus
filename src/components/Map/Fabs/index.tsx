import React from "react";

import UserFab from "./UserFab";
import FacilityFilterFabs from "./FacilityFilterFab";
import AddReportFab from "./AddReportFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <FacilityFilterFabs />
      <AddReportFab />
    </>
  );
};

export default Fabs;
