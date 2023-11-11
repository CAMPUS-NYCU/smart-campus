import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClusterQuery } from "../../../../api/cluster";
import { markers } from "../../../../utils/googleMaps";
import {
  isCurrentDrawerParams,
  getParamsFromDrawer,
} from "../../../../utils/routes/params";
import { getLocations } from "../../../../constants/facility";
import { Facilities } from "../../../../models/facility";

import { IRootState } from "../../../../store";
import { useSelector } from "react-redux";

const FacilityMarkers: React.FC = () => {
  const [searchParams] = useSearchParams();
  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);
  const isCurrentSearchParamsCluster = isCurrentDrawerParams(
    "cluster",
    searchParams,
  );

  const allFacilities: Facilities = useMemo(() => {
    if (cluster) {
      return getLocations(cluster.data.name);
    } else {
      return {};
    }
  }, [cluster]);

  const selectedCategories = useSelector(
    (state: IRootState) => state.facility.selectedCategories,
  );

  // Filter facilities based on selectedCategories
  const filteredFacilities: Facilities = useMemo(() => {
    return Object.fromEntries(
      Object.entries(allFacilities).filter(([, facility]) =>
        selectedCategories.includes(facility.target.name),
      ),
    );
  }, [allFacilities, selectedCategories]);

  React.useEffect(() => {
    if (isCurrentSearchParamsCluster)
      markers.facility.setFacilities(filteredFacilities);
    else {
      markers.facility.clear();
    }

    return () => {
      markers.facility.clear();
    };
  }, [isCurrentSearchParamsCluster, filteredFacilities]);
  return <></>;
};

export default FacilityMarkers;
