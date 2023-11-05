interface Facility {
  id: string;
  data: FacilityData;
}

export interface FacilityData {
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  target: {
    name: string;
    description: string;
  };
}

export type Facilities = Record<string, FacilityData>;

export default Facility;
