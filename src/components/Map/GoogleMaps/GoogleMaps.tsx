import React from "react";
import { useTheme } from "next-themes";

import { maps } from "../../../utils/googleMaps";

const GoogleMaps: React.FC = () => {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (mapContainerRef.current) {
      if (!maps.mapRef.current) {
        maps.loadMap(mapContainerRef.current, resolvedTheme);
      } else {
        maps.setTheme(resolvedTheme);
      }
    }
  }, [resolvedTheme]);

  React.useEffect(() => {
    return () => {
      maps.mapRef.current = null;
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default GoogleMaps;
