interface Cluster {
  id: string;
  data: ClusterData;
}

export interface ClusterData {
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
}

export type Clusters = Record<string, ClusterData>;

export type ClusterOrNull = Cluster | null;

export default Cluster;
