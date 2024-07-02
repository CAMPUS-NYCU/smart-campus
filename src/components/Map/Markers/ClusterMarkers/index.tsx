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
import { maps } from "../../../../utils/googleMaps";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/modal";
import ReportStart from "../../../modal/ReportStart";
import { getClusterCenter } from "../../../../constants/clusterCenter";

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

  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (clusterId: string) => {
      dispatch(openModal("reportStart"));
      setupDrawerParams<"cluster">(
        { clusterId },
        searchParams,
        setSearchParams,
      );

      const clusterCenter = getClusterCenter(clusters![clusterId].name)?.latlng;
      if (clusterCenter) {
        maps.panTo(clusterCenter.latitude, clusterCenter.longitude);
      }
      maps.setZoom(18);
    },
    [dispatch, clusters, searchParams, setSearchParams],
  );

  React.useEffect(() => {
    if (
      !isCurrentSearchParamsPoi &&
      !isCurrentSearchParamsCluster &&
      clusters
    ) {
      markers.cluster.setClusters(clusters);
      setOnClusterMarkerClick(handleClick);
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
  return (
    <>
      <ReportStart />
    </>
  );
};

export default ClusterMarkers;
