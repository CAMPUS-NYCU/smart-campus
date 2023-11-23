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

export const defaultEntry = {
  name: "Default Entry",
  latlng: {
    latitude: 0,
    longitude: 0,
  },
};

export type Entries = Record<string, EntryData>;

export default Entry;
