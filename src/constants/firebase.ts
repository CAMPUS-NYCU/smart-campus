import { FirebaseOptions } from "firebase/app";

import env from "./env";

export const firebaseOptions: FirebaseOptions = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

export const firebaseEmulatorConfig = {
  AUTH: {
    URL: "http://localhost:9099",
  },
  FIRESTORE: {
    HOST: "localhost",
    PORT: 8080,
  },
  STORAGE: {
    HOST: "localhost",
    PORT: 9199,
  },
};

export const firestoreConfig = {
  collection: {
    cluster: "Cluster",
    poi: "Poi",
    user: "User",
  },
};

export const firebaseStorageUrl = {
  images: {
    cluster: "images/cluster",
    poi: "images/poi",
  },
};
