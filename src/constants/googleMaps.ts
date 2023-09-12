import { LoaderOptions } from "@googlemaps/js-api-loader";
import env from "./env";

export enum LoadedLibrary {
  places = "places",
  drawing = "drawing",
  geometry = "geometry",
  localContext = "localContext",
  visualization = "visualization",
}

export const loaderOptions: LoaderOptions = {
  apiKey: env.GOOGLE_MAP_API_KEY,
  libraries: ["places"],
  language: "zh-TW",
};

const MapOptions: google.maps.MapOptions = {
  center: {
    lat: 24.7872616,
    lng: 120.9969249,
  },
  zoom: 17,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
};

export default MapOptions;
