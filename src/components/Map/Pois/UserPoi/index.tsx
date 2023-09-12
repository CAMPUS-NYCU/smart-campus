import React from "react";

import { mapInstanceRef } from "../../../../utils/googlemaps";
import { getUserMarker } from "../../../../utils/map/marker";

const UserPoi: React.FC = () => {
  const marker = React.useRef<google.maps.Marker | null>(null);

  React.useEffect(() => {
    const handleWatchPositionSuccess = (position: GeolocationPosition) => {
      if (marker.current) {
        marker.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        marker.current = getUserMarker(
          mapInstanceRef.current,
          new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
      }
    };

    const handleWatchPositionFail = (error: GeolocationPositionError) =>
      console.error(error);

    const watchId = navigator.geolocation.watchPosition(
      handleWatchPositionSuccess,
      handleWatchPositionFail,
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  return <></>;
};

export default UserPoi;
