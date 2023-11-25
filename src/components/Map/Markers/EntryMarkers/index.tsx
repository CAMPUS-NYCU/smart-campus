import { useSearchParams } from "react-router-dom";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { EntryData } from "../../../../models/entry";
import { useMemo } from "react";
import { getEntries } from "../../../../constants/entry";
import React from "react";
import { markers } from "../../../../utils/googleMaps";

const EntryMarkers: React.FC = () => {
  const [searchParams] = useSearchParams();
  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);
  const isCurrentSearchParamsCluster = isCurrentDrawerParams(
    "cluster",
    searchParams,
  );

  const targetEntry: EntryData | null = useMemo(() => {
    if (cluster) {
      return getEntries(cluster.data.name);
    } else {
      return null;
    }
  }, [cluster]);

  React.useEffect(() => {
    if (isCurrentSearchParamsCluster && targetEntry)
      markers.entry.setEntries(targetEntry);
    else {
      markers.entry.clear();
    }

    return () => {
      markers.entry.clear();
    };
  }, [isCurrentSearchParamsCluster, targetEntry]);
  return <></>;
};

export default EntryMarkers;
