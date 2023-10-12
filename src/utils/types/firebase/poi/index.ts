import { GeoPoint } from "firebase/firestore";
import { FirestorePoiData } from "../../../../models/firebase/firestore";
import { PoiData, PoiStatus } from "../../../../models/poi";

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  name: poi.name,
  clusterId: poi.clusterId,
  description: poi.description,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  status: poi.status,
  createBy: poi.createBy,
});

export const toPoiDataByFirebasePoiData = (poi: FirestorePoiData): PoiData => ({
  name: poi.name,
  clusterId: poi.clusterId,
  description: poi.description,
  latlng: {
    latitude: poi.latlng.latitude,
    longitude: poi.latlng.longitude,
  },
  status: poi.status as PoiStatus,
  createBy: poi.createBy,
});
