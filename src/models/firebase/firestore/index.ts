import { GeoPoint, Timestamp } from "firebase/firestore";
import { PoiStatusType, PoiStatusValue } from "../../poi";

export interface FirestoreCluster {
  id: string;
  data: FirestoreClusterData;
}

export interface FirestoreClusterData {
  name: string;
  resourceId: string;
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
  createdAt: Timestamp;
  createdBy: string;
  updatedAt: Timestamp | null;
  updatedBy: string | null;
  photoPaths: string[];
}

export interface FirestoreResource {
  id: string;
  data: FirestoreResourceData;
}

export interface FirestoreResourceData {
  name: string;
  groupId: string;
}

export interface FirestoreResourceGroup {
  id: string;
  data: FirestoreResourceGroupData;
}

export interface FirestoreResourceGroupData {
  name: string;
}

export interface FirestoreUser {
  id: string;
  data: FirestoreUserData;
}

export interface FirestoreUserData {}
