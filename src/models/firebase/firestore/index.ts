import { GeoPoint } from "firebase/firestore";
import { PoiStatusType, PoiStatusValue } from "../../poi";

export interface FirestoreCluster {
  id: string;
  data: FirestoreClusterData;
}

export interface FirestoreClusterData {
  name: string;
  latlng: GeoPoint;
}

export interface FirestorePoi {
  id: string;
  data: FirestorePoiData;
}

export interface FirestorePoiData {
  clusterId: string;
  floor: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  target: {
    category: string;
    name: string;
    serial: string;
  };
  status: {
    type: PoiStatusType;
    value: PoiStatusValue;
  };
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface FirestoreUser {
  id: string;
  data: FirestoreUserData;
}

export interface FirestoreUserData {}
