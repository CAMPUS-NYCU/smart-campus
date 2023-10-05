import { GeoPoint } from "firebase/firestore";

export interface FirestoreCluster {
  id: string;
  data: FirestoreClusterData;
}

export interface FirestoreClusterData {
  name: string;
  description: string;
  latlng: GeoPoint;
}

export interface FirestorePoi {
  id: string;
  data: FirestorePoiData;
}

export interface FirestorePoiData {
  name: string;
  clusterId: string;
  description: string;
  latlng: GeoPoint;
  createBy: string;
}

export interface FirestoreUser {
  id: string;
  data: FirestoreUserData;
}

export interface FirestoreUserData {
  username: string;
  displayName: string;
  avatarUrl: string | null;
}
