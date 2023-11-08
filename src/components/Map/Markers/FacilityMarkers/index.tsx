import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClusterQuery } from "../../../../api/cluster";
import { markers } from "../../../../utils/googleMaps";
import {
  isCurrentDrawerParams,
  getParamsFromDrawer,
} from "../../../../utils/routes/params";
import { getLocations } from "../../../../constants/facility";
import { Facilities, FacilityMarkersProps } from "../../../../models/facility";

const FacilityMarkers: React.FC<FacilityMarkersProps> = ({
  selectedCategories,
}) => {
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
    } else return {};
  }, [cluster]);

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
