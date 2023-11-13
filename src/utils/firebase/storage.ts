import { getStorage, connectStorageEmulator, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { firebaseApp } from ".";
import env from "../../constants/env";
import {
  firebaseEmulatorConfig,
  firebaseStorageUrl,
} from "../../constants/firebase";

const firebaseStorage = getStorage(firebaseApp);

if (env.ENABLE_FIREBASE_EMULATOR) {
  connectStorageEmulator(
    firebaseStorage,
    firebaseEmulatorConfig.STORAGE.HOST,
    firebaseEmulatorConfig.STORAGE.PORT,
  );
}

type imageStorageType = keyof typeof firebaseStorageUrl.images;

export const getImageStorageDirectoryRef = (type: imageStorageType) =>
  ref(firebaseStorage, `${firebaseStorageUrl.images[type]}`);

export const generateImageStorageRef = (type: imageStorageType) =>
  ref(firebaseStorage, `${firebaseStorageUrl.images[type]}/${uuidv4()}`);

export default firebaseStorage;
