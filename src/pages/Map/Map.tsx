import React from "react";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const Map: React.FC<Props> = (props: Props) => {
  const handleLogin = () => {
    props.login({
      username: "test",
      password: "test",
    });
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <>
      <>Name: [{props.username}]</>
      <button className="bg-blue-200 p-2 rounded-lg" onClick={handleLogin}>
        Login
      </button>
      <button className="bg-blue-500 p-2 rounded-lg" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Map;
