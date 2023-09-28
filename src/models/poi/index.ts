interface Poi {
  name: string;
  description: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  createBy: string;
}

export type PoiOrNull = Poi | null;

export default Poi;
