import React from "react";

import { markers } from "../../../../utils/googleMaps";

const User: React.FC = () => {
  React.useEffect(() => {
    const handleWatchPositionSuccess = (position: GeolocationPosition) => {
      markers.user.setLatLng(
        position.coords.latitude,
        position.coords.longitude,
      );
    };

    const handleWatchPositionFail = (error: GeolocationPositionError) =>
      console.error(error);

    const watchId = navigator.geolocation.watchPosition(
      handleWatchPositionSuccess,
      handleWatchPositionFail,
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      markers.user.clear();
    };
  }, []);
  return <></>;
};

export default User;
