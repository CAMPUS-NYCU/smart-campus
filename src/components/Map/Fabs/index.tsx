import React from "react";

import AddPoiFab from "./AddPoiFab";
import UserFab from "./UserFab";
import UserLocationFab from "./UserLocationFab";
import { useIsLoggedInQuery } from "../../../api/user";

const Fabs: React.FC = () => {
  const { data: isLoggedIn } = useIsLoggedInQuery();
  return (
    <>
      {isLoggedIn && <AddPoiFab />}
      <UserFab />
      <UserLocationFab />
    </>
  );
};

export default Fabs;
