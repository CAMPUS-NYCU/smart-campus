import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { firebaseApp } from ".";
import env from "../../constants/env";
import { firebaseEmulatorConfig } from "../../constants/firebase";

const firebaseAuth = getAuth(firebaseApp);

export const loadCurrentUser = (): Promise<User | null> =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      resolve(user);
      unsubscribe();
    });
  });

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
