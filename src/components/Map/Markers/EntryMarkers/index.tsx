import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetClusterQuery } from "../../../../api/cluster";
import { getEntry } from "../../../../constants/entry";
import { EntryData } from "../../../../models/entry";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../../utils/routes/params";
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
      return getEntry(cluster.data.name);
    } else {
      return null;
    }
  }, [cluster]);

  React.useEffect(() => {
    if (isCurrentSearchParamsCluster && targetEntry) {
      markers.entry.setEntry(targetEntry);
    } else {
      markers.entry.clear();
    }

    return () => {
      markers.entry.clear();
    };
  }, [isCurrentSearchParamsCluster, targetEntry]);

  return <></>;
};

export default EntryMarkers;
