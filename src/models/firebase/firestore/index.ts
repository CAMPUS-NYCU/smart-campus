import { GeoPoint } from "firebase/firestore";

export interface FirestorePoi {
  name: string;
  description: string;
  latlng: GeoPoint;
  createBy: string;
}

export interface FirestoreUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}
