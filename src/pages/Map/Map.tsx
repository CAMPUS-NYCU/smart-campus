import React from "react";
import { Button } from "@nextui-org/react";

import { default as MapComponent } from "../../components/Map";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const Map: React.FC<Props> = (props: Props) => {
  const handleLoginWithEmailAndPassword = () => {
    props.loginWithEmailAndPassword({
      email: "username@a.com",
      password: "password",
    });
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <>
      <MapComponent />
      <>Name: [{props.username}]</>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLoginWithEmailAndPassword}
      >
        Login
      </Button>
      <Button
        className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default Map;
