import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

import { FIREBASE_EMULATOR, FIREBASE_OPTIONS } from "../../constants/firebase";
import env from "../../constants/env";

const firebaseApp = initializeApp(FIREBASE_OPTIONS);

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectAuthEmulator(firebaseAuth, FIREBASE_EMULATOR.AUTH.URL, {
    disableWarnings: true,
  });
  connectFirestoreEmulator(
    firestore,
    FIREBASE_EMULATOR.FIRESTORE.HOST,
    FIREBASE_EMULATOR.FIRESTORE.PORT,
  );
  connectStorageEmulator(
    firebaseStorage,
    FIREBASE_EMULATOR.STORAGE.HOST,
    FIREBASE_EMULATOR.STORAGE.PORT,
  );
}

export const firebaseAuthProviders = {
  facebook: new FacebookAuthProvider(),
  github: new GithubAuthProvider(),
  google: new GoogleAuthProvider(),
  twitter: new TwitterAuthProvider(),
};

export default firebaseApp;
