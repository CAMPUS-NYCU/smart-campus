import { GeoPoint, Timestamp } from "firebase/firestore";
import { FirestorePoiData } from "../../../../models/firebase/firestore";
import { PoiData } from "../../../../models/poi";

function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export const toFirebasePoiDataByPoiData = (poi: PoiData): FirestorePoiData => ({
  clusterId: poi.clusterId,
  floor: poi.floor,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  target: {
    category: poi.target.category,
    name: poi.target.name,
    serial: poi.target.serial,
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
    serial: poi.target.serial,
  },
  status: {
    type: poi.status.type,
    value: poi.status.value,
  },
  createdAt: formatTime(poi.createdAt?.toDate()),
  createdBy: poi.createdBy,
  updatedAt: poi.updatedAt?.toDate()
    ? formatTime(poi.updatedAt?.toDate())
    : null,
  updatedBy: poi.updatedBy,
  photoPaths: poi.photoPaths,
});
