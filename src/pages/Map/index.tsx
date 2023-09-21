import React from "react";
import { Button } from "@nextui-org/react";

import {
  useGetUserAuthQuery,
  useLoginWithEmailAndPasswordMutation,
  useLoginWithProviderMutation,
  useLogoutMutation,
  useRegisterWithEmailAndPasswordMutation,
} from "../../api/auth";
import { default as MapComponent } from "../../components/Map";
import firebaseAuth, { firebaseAuthProviders } from "../../utils/firebase/auth";

const Map: React.FC = () => {
  const { data: userAuth } = useGetUserAuthQuery();

  const [
    loginWithEmailAndPassword,
    {
      isLoading: loginWithEmailAndPasswordIsLoading,
      error: loginWithEmailAndPasswordError,
    },
  ] = useLoginWithEmailAndPasswordMutation();

  const [
    registerWithEmailAndPassword,
    {
      isLoading: registerWithEmailAndPasswordIsLoading,
      error: registerWithEmailAndPasswordError,
    },
  ] = useRegisterWithEmailAndPasswordMutation();

  const [
    loginWithProvider,
    { isLoading: loginWithProviderIsLoading, error: loginWithProviderError },
  ] = useLoginWithProviderMutation();

  const [logout, { isLoading: logoutIsLoading, error: logoutError }] =
    useLogoutMutation();

  const handleLoginWithEmailAndPassword = () =>
    loginWithEmailAndPassword({
      email: "username@a.com",
      password: "password",
    });

  const handleRegisterWithEmailAndPassword = () =>
    registerWithEmailAndPassword({
      email: "username@a.com",
      password: "password",
    });

  const handleLoginWithFacebook = () =>
    loginWithProvider(firebaseAuthProviders.facebook);

  const handleLoginWithGitHub = () =>
    loginWithProvider(firebaseAuthProviders.github);

  const handleLoginWithGoogle = () =>
    loginWithProvider(firebaseAuthProviders.google);

  const handleLoginWithTwitter = () =>
    loginWithProvider(firebaseAuthProviders.twitter);

  const handleLogout = () => logout({});

  if (
    loginWithEmailAndPasswordIsLoading ||
    registerWithEmailAndPasswordIsLoading ||
    loginWithProviderIsLoading ||
    logoutIsLoading
  ) {
    return <>Loading...</>;
  }

  if (
    loginWithEmailAndPasswordError ||
    registerWithEmailAndPasswordError ||
    loginWithProviderError ||
    logoutError
  ) {
    return <>Error...</>;
  }

  return (
    <>
      <MapComponent />
      <>Name: [{userAuth?.username}]</>
      <>Name: [{firebaseAuth.currentUser?.email}]</>
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
