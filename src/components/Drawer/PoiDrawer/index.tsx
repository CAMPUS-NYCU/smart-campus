import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

import { useGetPoiQuery } from "../../../api/poi";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
  resetDrawerParams,
} from "../../../utils/routes/params";

import Drawer from "..";

const PoiDrawer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = isCurrentDrawerParams("poi", searchParams);
  const id = selected ? getParamsFromDrawer("poi", searchParams).poiId : null;

  const { data: poi } = useGetPoiQuery(id, {
    skip: !selected,
  });

  const handleDrawerClose = () => {
    resetDrawerParams(searchParams, setSearchParams);
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
