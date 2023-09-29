import { GeoPoint } from "firebase/firestore";

export interface FirestorePoi {
  id: string;
  data: FirestorePoiData;
}

export interface FirestorePoiData {
  name: string;
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
