import entryData from "../assets/data/markers/entries/entry.json";
import { defaultEntry, EntryData } from "../models/entry";

function getEntries(clusterName: string): EntryData {
  if (clusterName) {
    const matches = clusterName.match(/[^a-zA-Z\d]+/g);
    const pureClusterName = matches ? matches.join("") : "";

    const entryArray = Object.values(entryData);
    const result = entryArray.find((entry) => entry.name === pureClusterName);
    return result ? result : defaultEntry;
  }

  return defaultEntry;
}

export { getEntries };
