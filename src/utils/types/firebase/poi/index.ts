import { GeoPoint } from "firebase/firestore";
import { FirestorePoiData } from "../../../../models/firebase/firestore";
import { PoiData } from "../../../../models/poi";

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  name: poi.name,
  clusterId: poi.clusterId,
  description: poi.description,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
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
  createBy: poi.createBy,
});
