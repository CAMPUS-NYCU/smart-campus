import { Loader } from "@googlemaps/js-api-loader";
import { loaderOptions } from "../../constants/googleMaps";

export * as maps from "./maps";
export * as markers from "./markers";

export const loader = new Loader(loaderOptions);
