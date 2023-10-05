import { GeoPoint } from "firebase/firestore";
import {
  FirestoreCluster,
  FirestoreClusterData,
} from "../../../../models/firebase/firestore";
import Cluster, { ClusterData } from "../../../../models/cluster";

export const toFirebaseClusterByCluster = (
  cluster: Cluster,
): FirestoreCluster => ({
  id: cluster.id,
  data: toFirebaseClusterDataByClusterData(cluster.data),
});

export const toFirebaseClusterDataByClusterData = (
  cluster: ClusterData,
): FirestoreClusterData => ({
  name: cluster.name,
  description: cluster.description,
  latlng: new GeoPoint(cluster.latlng.latitude, cluster.latlng.longitude),
});

export const toClusterByFirebaseCluster = (
  cluster: FirestoreCluster,
): Cluster => ({
  id: cluster.id,
  data: toClusterDataByFirebaseClusterData(cluster.data),
});

export const toClusterDataByFirebaseClusterData = (
  cluster: FirestoreClusterData,
): ClusterData => ({
  name: cluster.name,
  description: cluster.description,
  latlng: {
    latitude: cluster.latlng.latitude,
    longitude: cluster.latlng.longitude,
  },
});
