import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@nextui-org/react";

import { firebaseAuth } from "../../utils/firebase";

import { PropsFromRedux } from "./connector";
import GoogleMaps from "../../components/Map/GoogleMaps";

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
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
        <GoogleMaps />
      </div>
      <>Name: [{props.username}]</>
      <Button className="bg-blue-200 p-2 rounded-lg" onClick={handleLogin}>
        Login
      </Button>
      <Button className="bg-blue-500 p-2 rounded-lg" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Map;
