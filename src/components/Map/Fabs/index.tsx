import React from "react";

import UserFab from "./UserFab";
import UserLocationFab from "./UserLocationFab";
import FacilityFilterFabs from "./FacilityFilterFab";

const Fabs: React.FC = () => {
  return (
    <>
      <UserFab />
      <UserLocationFab />
      <FacilityFilterFabs />
    </>
  );
};

export default Fabs;
