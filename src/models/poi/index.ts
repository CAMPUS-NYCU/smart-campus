import { poiStatus, poiStatusDescription } from "../../constants/model/poi";

interface Poi {
  id: string;
  data: PoiData;
  media: PoiMedia;
}

export type PoiStatus = keyof typeof poiStatus;
export type PoiStatusDescription = keyof typeof poiStatusDescription;

export interface PoiData {
  name: string;
  clusterId: string;
  description: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  status: PoiStatus;
  statusDescription: PoiStatusDescription;
  createBy: string;
}

export interface PoiMedia {
  photoUrls: string[];
}

export type Pois = Record<string, PoiData>;

export type PoiOrNull = Poi | null;

export default Poi;
