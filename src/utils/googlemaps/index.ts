import { Loader } from "@googlemaps/js-api-loader";
import { loaderOptions } from "../../constants/googleMaps";

export const loader = new Loader(loaderOptions);

export const mapInstanceRef = {
  current: null as google.maps.Map | null,
};
