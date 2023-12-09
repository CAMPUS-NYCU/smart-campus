import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

import {
  useIsLoggedInQuery,
  useLoginWithEmailAndPasswordMutation,
  useLoginWithProviderMutation,
  useRegisterWithEmailAndPasswordMutation,
} from "../../../api/user";
import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";
import { firebaseAuthProviders } from "../../../utils/firebase/auth";
import {
  PasswordInvisibleButtonIcon,
  PasswordVisibleButtonIcon,
} from "../../../utils/icons/login";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const Login: React.FC = () => {
  const { t } = useTranslation();

  const initInputLoginInfo = { email: "", password: "" };

  const [inputloginInfo, setInputloginInfo] =
    React.useState(initInputLoginInfo);
  const resetInputLoginInfo = () => setInputloginInfo(initInputLoginInfo);

  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["login"],
  );

  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal("login"));
  };

  const { data: isLoggedIn } = useIsLoggedInQuery();

  const [loginWithEmailAndPassword] = useLoginWithEmailAndPasswordMutation();

  const [registerWithEmailAndPassword] =
    useRegisterWithEmailAndPasswordMutation();

  const [loginWithProvider] = useLoginWithProviderMutation();

  const auth = getAuth();

  const handleLoginWithEmailAndPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return loginWithEmailAndPassword(inputloginInfo);
      })
      .then(resetInputLoginInfo)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleRegisterWithEmailAndPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return registerWithEmailAndPassword(inputloginInfo);
      })
      .then(resetInputLoginInfo)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
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
      dispatch(closeModal("login"));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("login.title", { ns: ["modal"] })}
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <Input
              autoFocus
              label={t("login.content.inputs.email.label", {
                ns: ["modal"],
              })}
              placeholder={t("login.content.inputs.email.placeholder", {
                ns: ["modal"],
              })}
              autoComplete="email"
              value={inputloginInfo.email}
              onValueChange={(value) =>
                setInputloginInfo({ ...inputloginInfo, email: value })
              }
              variant="bordered"
            />
            <Input
              label={t("login.content.inputs.password.label", {
                ns: ["modal"],
              })}
              placeholder={t("login.content.inputs.password.placeholder", {
                ns: ["modal"],
              })}
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
              {t("login.content.buttons.login", {
                ns: ["modal"],
              })}
            </Button>
            <Button
              className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
              onClick={handleRegisterWithEmailAndPassword}
              onTouchEnd={handleRegisterWithEmailAndPassword}
            >
              {t("login.content.buttons.register", {
                ns: ["modal"],
              })}
            </Button>
          </form>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithFacebook}
            onTouchEnd={handleLoginWithFacebook}
          >
            {t("login.content.buttons.loginWithFacebook", {
              ns: ["modal"],
            })}
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithGitHub}
            onTouchEnd={handleLoginWithGitHub}
          >
            {t("login.content.buttons.loginWithGitHub", {
              ns: ["modal"],
            })}
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithGoogle}
            onTouchEnd={handleLoginWithGoogle}
          >
            {t("login.content.buttons.loginWithGoogle", {
              ns: ["modal"],
            })}
          </Button>
          <Button
            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"
            onClick={handleLoginWithTwitter}
            onTouchEnd={handleLoginWithTwitter}
          >
            {t("login.content.buttons.loginWithTwitter", {
              ns: ["modal"],
            })}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
