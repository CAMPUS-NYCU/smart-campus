import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import { firebaseApp } from ".";
import env from "../../constants/env";
import { FIREBASE_EMULATOR } from "../../constants/firebase";

const firestore = getFirestore(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectFirestoreEmulator(
    firestore,
    FIREBASE_EMULATOR.FIRESTORE.HOST,
    FIREBASE_EMULATOR.FIRESTORE.PORT,
  );
}

export default firestore;
