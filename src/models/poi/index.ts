interface Poi {
  id: string;
  data: PoiData;
}

export interface PoiData {
  name: string;
  clusterId: string;
  description: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  createBy: string;
}

export type Pois = Record<string, PoiData>;

export type PoiOrNull = Poi | null;

export default Poi;
