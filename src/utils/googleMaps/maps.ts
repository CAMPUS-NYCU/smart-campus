import { loader } from ".";
import defaultMapOptions, {
  mapLightModeModifier,
  mapDarkModeModifier,
} from "../../constants/googleMaps";

export const mapRef = {
  current: null as google.maps.Map | null,
};

export const getDefaultMapOptions = (
  theme?: string,
): google.maps.MapOptions => {
  switch (theme) {
    case "dark":
      return {
        ...defaultMapOptions,
        ...mapDarkModeModifier,
      };
    case "light":
    default:
      return {
        ...defaultMapOptions,
        ...mapLightModeModifier,
      };
  }
};

export const loadMap = (mapDiv: HTMLElement, theme?: string): void => {
  loader.importLibrary("maps").then(() => {
    mapRef.current = new google.maps.Map(mapDiv, getDefaultMapOptions(theme));
  });
};

export const setTheme = (theme?: string): void => {
  switch (theme) {
    case "dark":
      return mapRef.current?.setOptions(mapDarkModeModifier);
    case "light":
    default:
      return mapRef.current?.setOptions(mapLightModeModifier);
  }
};

export const panTo = (lat: number, lng: number): void => {
  mapRef.current?.panTo({ lat, lng });
};

export const getCenter = (): google.maps.LatLng | null => {
  return mapRef.current?.getCenter() || null;
};

export const getBounds = (): google.maps.LatLngBounds | null => {
  return mapRef.current?.getBounds() || null;
};
