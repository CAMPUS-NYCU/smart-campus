import entryData from "../assets/data/markers/entries/entry.json";
import { EntryData } from "../models/entry";

function getEntry(clusterName: string): EntryData | null {
  if (clusterName) {
    // for research requirement. other cluster name may not be properly handled
    // 1. remove the number after a Chinese character of the cluster name
    // 2. remove the character from the dash (-) to the end of the cluster name
    const pureClusterName = clusterName
      .replace(/(\p{Script=Han})\d+/gu, "$1")
      .replace(/-.*$/, "");

    const foundEntry = entryData.find(
      (entry) => entry.name === pureClusterName,
    );

    if (foundEntry) {
      return foundEntry;
    } else {
      console.warn(`Entry not found: ${clusterName}`);
      return null;
    }
  }

  return null;
}

export { getEntry };
