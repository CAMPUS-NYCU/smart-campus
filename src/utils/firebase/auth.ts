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
import { FIREBASE_EMULATOR } from "../../constants/firebase";

const firebaseAuth = getAuth(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectAuthEmulator(firebaseAuth, FIREBASE_EMULATOR.AUTH.URL, {
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
