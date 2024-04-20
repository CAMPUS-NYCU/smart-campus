interface ImportMetaEnv {
  // Google Maps
  GOOGLE_MAP_API_KEY: string;

  // Firebase
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;

  // Firebase Emulator
  ENABLE_FIREBASE_EMULATOR: boolean;

  // OpenAi
  OPENAI_API_KEY: string;
}

const env: ImportMetaEnv = {
  // Google Maps
  GOOGLE_MAP_API_KEY: import.meta.env.VITE_GOOGLE_MAP_API_KEY || "",

  // Firebase
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || "",
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  FIREBASE_MESSAGING_SENDER_ID:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || "",
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",

  // Firebase Emulator
  ENABLE_FIREBASE_EMULATOR:
    import.meta.env.VITE_ENABLE_FIREBASE_EMULATOR || false,

  // OpenAi
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || "",
};

export default env;
