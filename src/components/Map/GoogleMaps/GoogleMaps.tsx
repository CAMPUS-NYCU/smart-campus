import React from "react";
import { useTheme } from "next-themes";

import {
  loadMap,
  mapInstanceRef,
  setMapTheme,
} from "../../../utils/map/googleMaps";

const GoogleMaps: React.FC = () => {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (mapContainerRef.current) {
      if (!mapInstanceRef.current) {
        loadMap(mapContainerRef.current, resolvedTheme);
      } else {
        setMapTheme(resolvedTheme);
      }
    }
  }, [resolvedTheme]);

  React.useEffect(() => {
    return () => {
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default GoogleMaps;
