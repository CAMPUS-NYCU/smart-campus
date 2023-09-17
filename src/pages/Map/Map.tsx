import React from "react";
import { Button } from "@nextui-org/react";

import { default as MapComponent } from "../../components/Map";
import { firebaseAuthProviders } from "../../utils/firebase/auth";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const Map: React.FC<Props> = (props: Props) => {
  const handleLoginWithEmailAndPassword = () => {
    props.loginWithEmailAndPassword({
      email: "username@a.com",
      password: "password",
    });
  };

  const handleRegisterWithEmailAndPassword = () => {
    props.registerWithEmailAndPassword({
      email: "username@a.com",
      password: "password",
    });
  };

  const handleLoginWithFacebook = () => {
    props.loginWithProvider({
      provider: firebaseAuthProviders.facebook,
    });
  };

  const handleLoginWithGitHub = () => {
    props.loginWithProvider({
      provider: firebaseAuthProviders.github,
    });
  };

  const handleLoginWithGoogle = () => {
    props.loginWithProvider({
      provider: firebaseAuthProviders.google,
    });
  };

  const handleLoginWithTwitter = () => {
    props.loginWithProvider({
      provider: firebaseAuthProviders.twitter,
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
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleRegisterWithEmailAndPassword}
      >
        Register
      </Button>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLoginWithFacebook}
      >
        Login with Facebook
      </Button>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLoginWithGitHub}
      >
        Login with GitHub
      </Button>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLoginWithGoogle}
      >
        Login with Google
      </Button>
      <Button
        className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
        onClick={handleLoginWithTwitter}
      >
        Login with Twitter
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
