import { FirebaseOptions } from "firebase/app";

import env from "./env";

export const FIREBASE_OPTIONS: FirebaseOptions = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

export const FIREBASE_EMULATOR = {
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

export const FIRESTORE_COLLECTIONS = {
  CLUSTER: "Cluster",
  POI: "Poi",
  USER: "User",
};

export const firebaseStorageUrl = {
  images: {
    cluster: "images/cluster",
    poi: "images/poi",
  },
};
