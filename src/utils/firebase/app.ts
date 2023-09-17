import { initializeApp } from "firebase/app";

import { FIREBASE_OPTIONS } from "../../constants/firebase";

const firebaseApp = initializeApp(FIREBASE_OPTIONS);

export default firebaseApp;
