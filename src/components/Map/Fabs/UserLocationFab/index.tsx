import React from "react";
import { UserLocationFabIcon } from "../../../../utils/icons/map";
import { Button } from "@nextui-org/react";
import { mapInstanceRef } from "../../../../utils/map/googleMaps";

const UserLocationFab: React.FC = () => {
  const handleUserLocationFabClick = () => {
    const handleGetCurrentPositionSuccess = (position: GeolocationPosition) => {
      mapInstanceRef.current?.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        ),
      );
    };

    const handleGetCurrentPositionFail = (error: GeolocationPositionError) =>
      console.error(error);

    navigator.geolocation.getCurrentPosition(
      handleGetCurrentPositionSuccess,
      handleGetCurrentPositionFail,
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true },
    );
  };

  return (
    <Button
      aria-label="User Location"
      className="absolute bottom-0 right-0 \
               bg-zinc-50 dark:bg-zinc-800 \
                 border border-zinc-400 dark:border-zinc-900 \
                 shadow-sm shadow-zinc-300 dark:shadow-zinc-800"
      isIconOnly
      radius="full"
      size="lg"
      onClick={handleUserLocationFabClick}
    >
      <UserLocationFabIcon />
    </Button>
  );
};

export default UserLocationFab;
