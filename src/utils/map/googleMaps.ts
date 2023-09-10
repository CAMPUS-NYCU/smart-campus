import { Loader } from "@googlemaps/js-api-loader";
import defaultMapOptions, {
  loaderOptions,
  mapDarkModeStyles,
} from "../../constants/googleMaps";

export const loader = new Loader(loaderOptions);

export const mapInstanceRef = {
  current: null as google.maps.Map | null,
};

export const getDefaultMapOptions = (
  theme?: string,
): google.maps.MapOptions => {
  switch (theme) {
    case "dark":
      return {
        ...defaultMapOptions,
        styles: mapDarkModeStyles,
      };
    case "light":
    default:
      return {
        ...defaultMapOptions,
        styles: [],
      };
  }
};

export const loadMap = (mapDiv: HTMLElement, theme?: string): void => {
  loader.importLibrary("maps").then(() => {
    mapInstanceRef.current = new google.maps.Map(
      mapDiv,
      getDefaultMapOptions(theme),
    );
  });
};

export const setMapTheme = (theme?: string): void => {
  switch (theme) {
    case "dark":
      return mapInstanceRef.current?.setOptions({
        styles: mapDarkModeStyles,
      });
    case "light":
    default:
      return mapInstanceRef.current?.setOptions({
        styles: [],
      });
  }
};
