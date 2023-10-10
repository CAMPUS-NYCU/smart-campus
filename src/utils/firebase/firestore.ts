import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import { firebaseApp } from ".";
import env from "../../constants/env";
import { firebaseEmulatorConfig } from "../../constants/firebase";

const firestore = getFirestore(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectFirestoreEmulator(
    firestore,
    firebaseEmulatorConfig.FIRESTORE.HOST,
    firebaseEmulatorConfig.FIRESTORE.PORT,
  );
}

export default firestore;
