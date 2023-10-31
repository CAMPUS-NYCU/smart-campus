import { GeoPoint } from "firebase/firestore";
import { PoiStatus, PoiStatusDescription } from "../../poi";

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
  clusterId: string;
  floor: string;
  latlng: GeoPoint;
  target: {
    type: string;
    name: string;
    description: string;
  };
  status: {
    name: PoiStatus;
    description: PoiStatusDescription;
  };
  lastUpdatedTime: string;
  createBy: string;
}

export interface FirestoreUser {
  id: string;
  data: FirestoreUserData;
}

export interface FirestoreUserData {}
