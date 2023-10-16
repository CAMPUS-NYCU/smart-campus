// import { poiStatus } from "../../constants/model/poi";

interface Poi {
  id: string;
  data: PoiData;
  media: PoiMedia;
}

// export type PoiStatus = keyof typeof poiStatus;

export interface PoiData {
  name: string;
  clusterId: string;
  description: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  floor: string;
  category: PoiCategory;
  status: PoiStatus;
  lastUpdateTime: string;
  createBy: string;
}

export interface PoiMedia {
  photoUrls: string[];
}

export type Pois = Record<string, PoiData>;

export type PoiOrNull = Poi | null;

export default Poi;

export interface PoiCategory {
  type: string;
  name: string;
  descname: string;
}

export interface PoiStatus {
  name: string;
  descname: string;
}
