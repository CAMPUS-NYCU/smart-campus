import React, { useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import {
  useIsLoggedInQuery,
  useLoginWithEmailAndPasswordMutation,
  useLoginWithProviderMutation,
  useRegisterWithEmailAndPasswordMutation,
} from "../../../api/user";
import { firebaseAuthProviders } from "../../../utils/firebase/auth";
import {
  PasswordInvisibleButtonIcon,
  PasswordVisibleButtonIcon,
} from "../../../utils/icons/login";

interface LoginProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

const Login: React.FC<LoginProps> = (props) => {
  const { disclosure } = props;

  const initInputLoginInfo = { email: "", password: "" };

  const [inputloginInfo, setInputloginInfo] =
    React.useState(initInputLoginInfo);
  const resetInputLoginInfo = () => setInputloginInfo(initInputLoginInfo);

  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  const { data: isLoggedIn } = useIsLoggedInQuery();

  const [loginWithEmailAndPassword] = useLoginWithEmailAndPasswordMutation();

  const [registerWithEmailAndPassword] =
    useRegisterWithEmailAndPasswordMutation();

  const [loginWithProvider] = useLoginWithProviderMutation();

  const handleLoginWithEmailAndPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    loginWithEmailAndPassword(inputloginInfo).then(resetInputLoginInfo);
  };

  const handleRegisterWithEmailAndPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    registerWithEmailAndPassword(inputloginInfo).then(resetInputLoginInfo);
  };

  const handleLoginWithFacebook = (event: React.SyntheticEvent) => {
    event.preventDefault();
    loginWithProvider(firebaseAuthProviders.facebook);
  };

  const handleLoginWithGitHub = (event: React.SyntheticEvent) => {
    event.preventDefault();
    loginWithProvider(firebaseAuthProviders.github);
  };

  const handleLoginWithGoogle = (event: React.SyntheticEvent) => {
    event.preventDefault();
    loginWithProvider(firebaseAuthProviders.google);
  };

  const handleLoginWithTwitter = (event: React.SyntheticEvent) => {
    event.preventDefault();
    loginWithProvider(firebaseAuthProviders.twitter);
  };

  useEffect(() => {
    if (isLoggedIn) {
      disclosure.onClose();
    }
  }, [isLoggedIn, disclosure]);

  return (
    <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <Input
              autoFocus
              label="Email"
              placeholder="Enter your email"
              autoComplete="email"
              value={inputloginInfo.email}
              onValueChange={(value) =>
                setInputloginInfo({ ...inputloginInfo, email: value })
              }
              variant="bordered"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              type={isPasswordVisible ? "text" : "password"}
              value={inputloginInfo.password}
              onValueChange={(value) =>
                setInputloginInfo({ ...inputloginInfo, password: value })
              }
              endContent={
                <button
                  className="focus:outline-none"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <PasswordVisibleButtonIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <PasswordInvisibleButtonIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              variant="bordered"
            />
            <Button
              className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
              onClick={handleLoginWithEmailAndPassword}
              onTouchEnd={handleLoginWithEmailAndPassword}
            >
              Login
            </Button>
            <Button
              className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
              onClick={handleRegisterWithEmailAndPassword}
              onTouchEnd={handleRegisterWithEmailAndPassword}
            >
              Register
            </Button>
          </form>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithFacebook}
            onTouchEnd={handleLoginWithFacebook}
          >
            Login with Facebook
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithGitHub}
            onTouchEnd={handleLoginWithGitHub}
          >
            Login with GitHub
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithGoogle}
            onTouchEnd={handleLoginWithGoogle}
          >
            Login with Google
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithTwitter}
            onTouchEnd={handleLoginWithTwitter}
          >
            Login with Twitter
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
