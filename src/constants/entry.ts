import entryData from "../assets/data/markers/entries/entry.json";
import { EntryData } from "../models/entry";

function getEntry(clusterName: string): EntryData | null {
  if (clusterName) {
    const matches = clusterName.match(/[^a-zA-Z\d]+/g);
    const pureClusterName = matches ? matches.join("") : "";

    const foundEntry = entryData.find(
      (entry) => entry.name === pureClusterName,
    );

    if (foundEntry) {
      return foundEntry;
    } else {
      return null;
    }
  }

  return null;
}

export { getEntry };
