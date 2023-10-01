import React from "react";
import { useDispatch } from "react-redux";

import { useGetClustersQuery } from "../../../../api/cluster";
import DrawerType from "../../../../models/drawer";
import { pushDrawer } from "../../../../store/mapDrawer";
import { markers } from "../../../../utils/googleMaps";
import { setOnClusterMarkerClick } from "../../../../utils/googleMaps/markers/cluster";

const ClusterMarkers: React.FC = () => {
  const dispatch = useDispatch();

  const { data: clusters } = useGetClustersQuery();

  const handleClusterMarkerClick = React.useCallback(
    (clusterId: string) => {
      dispatch(pushDrawer({ type: DrawerType.ClusterView, id: clusterId }));
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
