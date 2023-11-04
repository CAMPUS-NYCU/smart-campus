import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClustersQuery } from "../../../../api/cluster";
import { markers } from "../../../../utils/googleMaps";
import { setOnClusterMarkerClick } from "../../../../utils/googleMaps/markers/cluster";
import { getResourceId } from "../../../../utils/resources";
import {
  isCurrentDrawerParams,
  setupDrawerParams,
} from "../../../../utils/routes/params";

const ClusterMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const resourceId = getResourceId();

  const { data: clusters } = useGetClustersQuery(resourceId, {
    skip: !resourceId,
  });
  const isCurrentSearchParamsPoi = isCurrentDrawerParams("poi", searchParams);
  const isCurrentSearchParamsCluster = isCurrentDrawerParams(
    "cluster",
    searchParams,
  );

  const handleClick = React.useCallback(
    (clusterId: string) =>
      setupDrawerParams<"cluster">(
        { clusterId },
        searchParams,
        setSearchParams,
      ),
    [searchParams, setSearchParams],
  );

  React.useEffect(() => {
    if (!isCurrentSearchParamsPoi && clusters) {
      markers.cluster.setClusters(clusters);
      setOnClusterMarkerClick(handleClick);
    }

    if (isCurrentSearchParamsCluster) {
      markers.cluster.clear();
    }

    return () => {
      markers.cluster.clear();
    };
  }, [
    clusters,
    handleClick,
    isCurrentSearchParamsPoi,
    isCurrentSearchParamsCluster,
  ]);
  return <></>;
};

export default ClusterMarkers;
