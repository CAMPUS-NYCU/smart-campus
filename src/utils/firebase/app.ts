import { initializeApp } from "firebase/app";

import { firebaseOptions } from "../../constants/firebase";

const firebaseApp = initializeApp(firebaseOptions);

export default firebaseApp;
