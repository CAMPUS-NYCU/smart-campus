import { getStorage, connectStorageEmulator } from "firebase/storage";

import { firebaseApp } from ".";
import env from "../../constants/env";
import { FIREBASE_EMULATOR } from "../../constants/firebase";

const firebaseStorage = getStorage(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectStorageEmulator(
    firebaseStorage,
    FIREBASE_EMULATOR.STORAGE.HOST,
    FIREBASE_EMULATOR.STORAGE.PORT,
  );
}

export default firebaseStorage;
