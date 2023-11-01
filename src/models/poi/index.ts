import { poiStatusName, poiStatusDescription } from "../../constants/model/poi";

interface Poi {
  id: string;
  data: PoiData;
  media: PoiMedia;
}

export type PoiStatusName = keyof typeof poiStatusName;
export type PoiStatusDescription = keyof typeof poiStatusDescription;

export interface PoiData {
  clusterId: string; // 所屬 cluster Id
  floor: string; // e.g. 7F, B1
  latlng: {
    latitude: number;
    longitude: number;
  };
  target: {
    type: string; // 回報項目類型 e.g. 物體
    name: string; // 回報項目名稱 e.g. 飲水機
    description: string; // 回報項目敘述 e.g. 飲水機1
  };
  status: {
    name: PoiStatusName; // 回報狀態類型 e.g. 清潔狀態
    description: PoiStatusDescription; // e.g. 回報狀態描述 e.g. 整潔(清潔狀態)
  };
  lastUpdatedTime: string;
  createBy: string;
}

export interface PoiMedia {
  photoUrls: string[];
}

export type Pois = Record<string, PoiData>;

export type PoiOrNull = Poi | null;

export default Poi;
