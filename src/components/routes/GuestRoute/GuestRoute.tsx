import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

import url from "../../../constants/routes";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const GuestRoute: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.idToken) {
      navigate(url.map);
    }
  }, [navigate, props.idToken]);

  return <Outlet />;
};

export default GuestRoute;
