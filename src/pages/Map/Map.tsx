import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@nextui-org/react";

import { firebaseAuth } from "../../utils/firebase";
import { default as MapComponent } from "../../components/Map";
import SwitchTheme from "../../components/theme/SwitchTheme";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const Map: React.FC<Props> = (props: Props) => {
  const handleLogin = () => {
    signInWithEmailAndPassword(firebaseAuth, "username@a.com", "password")
      .then((userCredential) => {
        const user = userCredential.user;
        props.login({
          username: user?.email || "",
          password: "password",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <>
      <SwitchTheme />
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
        <MapComponent />
      </div>
      <>Name: [{props.username}]</>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLogin}
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
