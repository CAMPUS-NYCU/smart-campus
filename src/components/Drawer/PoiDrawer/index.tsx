import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import { routeParams, routeParamsKeys } from "../../../models/route";

import Drawer from "..";

const PoiDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected =
    searchParams.get(routeParamsKeys.markerType) === routeParams.markerType.poi;
  const id = selected ? searchParams.get(routeParamsKeys.markerId) : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });

  const handleDrawerClose = () => {
    searchParams.delete(routeParamsKeys.markerType);
    searchParams.delete(routeParamsKeys.markerId);
    setSearchParams(searchParams);
  };

  return (
    <Drawer
      open={selected}
      onClose={handleDrawerClose}
      title={poi?.data.name}
      children={
        <div>
          <div>description: {poi?.data.description}</div>
          <div>
            latlng: {poi?.data.latlng.latitude}, {poi?.data.latlng.longitude}
          </div>
        </div>
      }
      primaryButton={<Button onClick={handleDrawerClose}>primary</Button>}
      secondaryButton={<button onClick={handleDrawerClose}>secondary</button>}
    />
  );
};

export default PoiDrawer;
