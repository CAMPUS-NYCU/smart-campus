import React from "react";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { isCurrentDrawerParams } from "../../../../utils/routes/params";
import { useDispatch } from "react-redux";

import facilityMarkerFilter from "../../../../assets/images/facilityMarkerFilter.svg";
import { openModal } from "../../../../store/modal";
import FacilityFilter from "../../../modal/FacilityFilter";

const FacilityFilterFab: React.FC = () => {
  const [searchParams] = useSearchParams();

  const isCurrentSearchParamsCluster = isCurrentDrawerParams(
    "cluster",
    searchParams,
  );

  const dispatch = useDispatch();

  const handleFilterClick = () => {
    dispatch(openModal("facilityFilter"));
  };

  return isCurrentSearchParamsCluster ? (
    <>
      <Button
        key="FacilityFilterFab"
        className="absolute top-20 right-4 w-10 h-10"
        isIconOnly
        size="sm"
        style={{ backgroundColor: "transparent", padding: 0 }}
        onClick={() => {
          handleFilterClick();
        }}
      >
        <img src={facilityMarkerFilter} alt="facilityMarkerFilter" />
      </Button>
      <FacilityFilter />
    </>
  ) : null;
};

export default FacilityFilterFab;
