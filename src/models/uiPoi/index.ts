import { poiStatusType, poiStatusValue } from "../../constants/model/poi";

interface UIPoi {
  id: string;
  data: UIPoiData;
}

export type PoiStatusType = keyof typeof poiStatusType;
export type PoiStatusValue = keyof typeof poiStatusValue;

export interface UIPoiData {
  clusterId: string; // 所屬 cluster Id
  floor: string; // e.g. 7F, B1
  latlng: {
    latitude: number;
    longitude: number;
  };
  target: {
    category: string; // 回報項目類型 e.g. 物體
    name: string; // 回報項目名稱 e.g. 飲水機
    serial: string; // 回報項目敘述 e.g. 飲水機1-2
  };
  status: {
    type: PoiStatusType | ""; // 狀態 e.g. 清潔狀態
    value: PoiStatusValue | ""; // 狀態的描述 e.g. 整潔(清潔狀態的其中一種描述)
  };
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  photoPaths: string[];
  isVisible: boolean;
}

export type UIPois = Record<string, UIPoiData>;

export type UIPoiOrNull = UIPoi | null;

export default UIPoi;
