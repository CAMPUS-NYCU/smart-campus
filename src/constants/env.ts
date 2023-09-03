interface ImportMetaEnv {
  // Google Maps
  GOOGLE_MAP_API_KEY: string;
}

const env: ImportMetaEnv = {
  // Google Maps
  GOOGLE_MAP_API_KEY: import.meta.env.VITE_GOOGLE_MAP_API_KEY || "",
};

export default env;
