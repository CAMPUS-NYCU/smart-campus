import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useIsLoggedInQuery } from "../../../api/auth";
import url from "../../../constants/routes";

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();

  const { data: isLoggedIn } = useIsLoggedInQuery();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate(url.map);
    }
  }, [navigate, isLoggedIn]);

  return <Outlet />;
};

export default PrivateRoute;
