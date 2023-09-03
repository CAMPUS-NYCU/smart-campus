import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

import url from "../../../constants/routes";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const GuestRoute: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.token) {
      navigate(url.map);
    }
  }, [navigate, props.token]);

  return <Outlet />;
};

export default GuestRoute;
