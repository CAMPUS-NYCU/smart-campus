import React from "react";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const User: React.FC<Props> = (props: Props) => {
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default User;
