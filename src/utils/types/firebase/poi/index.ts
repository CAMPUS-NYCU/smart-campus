import { GeoPoint, Timestamp } from "firebase/firestore";
import { FirestorePoiData } from "../../../../models/firebase/firestore";
import { PoiData } from "../../../../models/poi";

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  clusterId: poi.clusterId,
  floor: poi.floor,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  target: {
    category: poi.target.category,
    name: poi.target.name,
  },
  status: {
    type: poi.status.type,
    value: poi.status.value,
  },
  createdAt: Timestamp.fromDate(new Date(poi.createdAt)),
  createdBy: poi.createdBy,
  updatedAt: poi.updatedAt ? Timestamp.fromDate(new Date(poi.updatedAt)) : null,
  updatedBy: poi.updatedBy,
  photoPaths: poi.photoPaths,
});

export const toPoiDataByFirebasePoiData = (poi: FirestorePoiData): PoiData => ({
  clusterId: poi.clusterId,
  floor: poi.floor,
  latlng: {
    latitude: poi.latlng.latitude,
    longitude: poi.latlng.longitude,
  },
  target: {
    category: poi.target.category,
    name: poi.target.name,
  },
  status: {
    type: poi.status.type,
    value: poi.status.value,
  },
  createdAt: poi.createdAt?.toDate().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  createdBy: poi.createdBy,
  updatedAt:
    poi.updatedAt?.toDate().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) || null,
  updatedBy: poi.updatedBy,
  photoPaths: poi.photoPaths,
});
