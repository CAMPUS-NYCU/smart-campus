import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClustersQuery } from "../../../../api/cluster";
import { markers } from "../../../../utils/googleMaps";
import { setOnClusterMarkerClick } from "../../../../utils/googleMaps/markers/cluster";
import { setupDrawerParams } from "../../../../utils/routes/params";

const ClusterMarkers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: clusters } = useGetClustersQuery();

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
