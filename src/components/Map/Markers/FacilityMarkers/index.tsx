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

const FacilityMarkers: React.FC = () => {
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);
  const isCurrentSearchParamsCluster = isCurrentDrawerParams(
    "cluster",
    searchParams,
  );

  const facilities: Facilities = useMemo(() => {
    if (cluster) {
      return getLocations(cluster.data.name);
    }
    return {};
  }, [cluster]);

  React.useEffect(() => {
    if (isCurrentSearchParamsCluster)
      markers.facility.setFacilities(facilities);
    else {
      markers.facility.clear();
    }

    return () => {
      markers.facility.clear();
    };
  }, [isCurrentSearchParamsCluster, facilities]);
  return <></>;
};

export default FacilityMarkers;
