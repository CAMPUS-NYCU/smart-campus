import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  connectAuthEmulator,
  getAuth,
} from "firebase/auth";

import { firebaseApp } from ".";
import env from "../../constants/env";
import { firebaseEmulatorConfig } from "../../constants/firebase";

const firebaseAuth = getAuth(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectAuthEmulator(firebaseAuth, firebaseEmulatorConfig.AUTH.URL, {
    disableWarnings: true,
  });
}

export const firebaseAuthProviders = {
  facebook: new FacebookAuthProvider(),
  github: new GithubAuthProvider(),
  google: new GoogleAuthProvider(),
  twitter: new TwitterAuthProvider(),
};

export default firebaseAuth;
