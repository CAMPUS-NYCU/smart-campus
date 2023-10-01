import React from "react";
import { useDispatch } from "react-redux";

import { useGetClustersQuery } from "../../../../api/cluster";
import { markers } from "../../../../utils/googleMaps";
import { setOnClusterMarkerClick } from "../../../../utils/googleMaps/markers/cluster";
import { setCurrentClusterId } from "../../../../store/mapDrawer";

const ClusterMarkers: React.FC = () => {
  const dispatch = useDispatch();

  const { data: clusters } = useGetClustersQuery();

  const handleClusterMarkerClick = React.useCallback(
    (clusterId: string) => {
      dispatch(setCurrentClusterId(clusterId));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (clusters) {
      markers.cluster.setClusters(clusters);
      setOnClusterMarkerClick(handleClusterMarkerClick);
    }

    return () => {
      markers.cluster.clear();
    };
  }, [handleClusterMarkerClick, clusters]);
  return <></>;
};

export default ClusterMarkers;
