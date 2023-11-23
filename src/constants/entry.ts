import entryData from "../assets/data/markers/entries/entry.json";
import { defaultEntry, EntryData } from "../models/entry";

function getEntries(clusterName: string): EntryData {
  if (clusterName) {
    const matches = clusterName.match(/[^a-zA-Z\d]+/g);
    const pureClusterName = matches ? matches.join("") : "";

    for (let i = 0; i < entryData.length; i++) {
      if (entryData[i].name === pureClusterName) {
        return entryData[i];
      }
    }
  }

  return defaultEntry;
}

export { getEntries };