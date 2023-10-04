import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClustersQuery } from "../../../../api/cluster";
import { routeParams, routeParamsKeys } from "../../../../models/route";
import { markers } from "../../../../utils/googleMaps";
import { setOnClusterMarkerClick } from "../../../../utils/googleMaps/markers/cluster";

const ClusterMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: clusters } = useGetClustersQuery();

  const handleClick = React.useCallback(
    (clusterId: string) => {
      searchParams.set(
        routeParamsKeys.markerType,
        routeParams.markerType.cluster,
      );
      searchParams.set(routeParamsKeys.markerId, clusterId);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    if (clusters) {
      markers.cluster.setClusters(clusters);
      setOnClusterMarkerClick(handleClick);
    }

    return () => {
      markers.cluster.clear();
    };
  }, [clusters, handleClick]);
  return <></>;
};

export default ClusterMarkers;
