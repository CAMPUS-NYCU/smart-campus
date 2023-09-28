import { GeoPoint } from "firebase/firestore";
import { FirestorePoi } from "../../../../models/firebase/firestore";
import Poi from "../../../../models/poi";

export const toFirebasePoiByPoi = (poi: Poi): FirestorePoi => ({
  name: poi.name,
  description: poi.description,
  latlng: new GeoPoint(poi.latlng.latitude, poi.latlng.longitude),
  createBy: poi.createBy,
});

export const toPoiByFirebasePoi = (poi: FirestorePoi): Poi => ({
  name: poi.name,
  description: poi.description,
  latlng: {
    latitude: poi.latlng.latitude,
    longitude: poi.latlng.longitude,
  },
  createBy: poi.createBy,
});
