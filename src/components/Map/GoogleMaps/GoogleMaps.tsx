import React from "react";
import { loader, mapInstanceRef } from "../../../utils/googlemaps";
import MapOptions from "../../../constants/googleMaps";

const GoogleMaps: React.FC = () => {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mapContainerRef.current) {
      loader.importLibrary("maps").then(() => {
        mapInstanceRef.current = new google.maps.Map(
          mapContainerRef.current!,
          MapOptions,
        );
      });
    }

    return () => {
      mapInstanceRef.current = null;
    };
  }, [mapContainerRef]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default GoogleMaps;
