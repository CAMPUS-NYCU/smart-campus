interface Entry {
  id: string;
  data: EntryData;
}

export interface EntryData {
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
}

export type Entries = Record<string, EntryData>;

export default Entry;
