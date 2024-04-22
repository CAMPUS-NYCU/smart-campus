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
// import { openModal } from "../../../../store/modal";
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
  const [onClickedClusterName, setOnClickedClusterName] = React.useState("");

  const handleClick = React.useCallback(
    (clusterId: string) => {
      setOnClickedClusterName(clusters![clusterId].name);
      setupDrawerParams<"cluster">(
        { clusterId },
        searchParams,
        setSearchParams,
      );
    },
    [searchParams, setSearchParams, clusters],
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isCurrentSearchParamsPoi && clusters) {
      markers.cluster.setClusters(clusters);
      setOnClusterMarkerClick(handleClick);
    }

    if (isCurrentSearchParamsCluster) {
      const clusterCenter = getClusterCenter(onClickedClusterName)?.latlng;
      if (clusterCenter) {
        maps.panTo(clusterCenter.latitude, clusterCenter.longitude);
      }
      maps.setZoom(18);
      markers.cluster.clear();
      // dispatch(openModal("reportStart"));
    }

    return () => {
      markers.cluster.clear();
    };
  }, [
    clusters,
    handleClick,
    isCurrentSearchParamsPoi,
    isCurrentSearchParamsCluster,
    onClickedClusterName,
    dispatch,
  ]);
  return (
    <>
      <ReportStart />
    </>
  );
};

export default ClusterMarkers;
