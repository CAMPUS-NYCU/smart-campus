import { GeoPoint } from "firebase/firestore";
import {
  FirestorePoi,
  FirestorePoiData,
} from "../../../../models/firebase/firestore";
import Poi, { PoiData } from "../../../../models/poi";

export const toFirebasePoiByPoi = (poi: Poi): FirestorePoi => ({
  id: poi.id,
  data: toFirebasePoiDataByPoiData(poi.data),
});

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  name: poi.name,
  description: poi.description,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  createBy: poi.createBy,
});

export const toPoiByFirebasePoi = (poi: FirestorePoi): Poi => ({
  id: poi.id,
  data: toPoiDataByFirebasePoiData(poi.data),
});

export const toPoiDataByFirebasePoiData = (poi: FirestorePoiData): PoiData => ({
  name: poi.name,
  description: poi.description,
  latlng: {
    latitude: poi.latlng.latitude,
    longitude: poi.latlng.longitude,
  },
  createBy: poi.createBy,
});
