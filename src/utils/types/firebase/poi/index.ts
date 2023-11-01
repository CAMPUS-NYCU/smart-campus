import { GeoPoint } from "firebase/firestore";
import { FirestorePoiData } from "../../../../models/firebase/firestore";
import {
  PoiData,
  PoiStatusDescription,
  PoiStatusName,
} from "../../../../models/poi";

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  clusterId: poi.clusterId,
  floor: poi.floor,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  target: {
    type: poi.target.type,
    name: poi.target.name,
    description: poi.target.description,
  },
  status: {
    name: poi.status.name,
    description: poi.status.description,
  },
  lastUpdatedTime: poi.lastUpdatedTime,
  createBy: poi.createBy,
});

export const toPoiDataByFirebasePoiData = (poi: FirestorePoiData): PoiData => ({
  clusterId: poi.clusterId,
  floor: poi.floor,
  latlng: {
    latitude: poi.latlng.latitude,
    longitude: poi.latlng.longitude,
  },
  target: {
    type: poi.target.type,
    name: poi.target.name,
    description: poi.target.description,
  },
  status: {
    name: poi.status.name as PoiStatusName,
    description: poi.status.description as PoiStatusDescription,
  },
  lastUpdatedTime: poi.lastUpdatedTime,
  createBy: poi.createBy,
});
