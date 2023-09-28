import React from "react";
import { Button } from "@nextui-org/react";

import { useAddPoiMutation } from "../../../../api/poi";
import { useGetUserQuery } from "../../../../api/user";
import { maps } from "../../../../utils/googleMaps";
import { AddPoiFabIcon } from "../../../../utils/icons/map";

const AddPoiFab: React.FC = () => {
  const [addPoi] = useAddPoiMutation();
  const { data: user } = useGetUserQuery();
  const handleClick = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }
    addPoi({
      name: "New Poi Name",
      description: "New Poi Description",
      latlng: {
        latitude: center.lat(),
        longitude: center.lng(),
      },
      createBy: user?.id || "",
    });
  };

  return (
    <Button
      aria-label="Add Poi"
      className="absolute bottom-0 left-0 \
               bg-zinc-50 dark:bg-zinc-800 \
                 border border-zinc-400 dark:border-zinc-900 \
                 shadow-sm shadow-zinc-300 dark:shadow-zinc-800"
      isIconOnly
      radius="full"
      size="lg"
      onClick={handleClick}
      onTouchEnd={handleClick}
    >
      <AddPoiFabIcon />
    </Button>
  );
};

export default AddPoiFab;
