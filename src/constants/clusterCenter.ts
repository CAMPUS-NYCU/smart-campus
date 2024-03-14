import centerData from "../assets/data/clusterCenters/clusterCenter.json";

function getClusterCenter(clusterName: string) {
  if (clusterName) {
    // for research requirement. other cluster name may not be properly handled
    // 1. remove the number after a Chinese character of the cluster name
    // 2. remove the character from the dash (-) to the end of the cluster name
    const pureClusterName = clusterName
      .replace(/(\p{Script=Han})\d+/gu, "$1")
      .replace(/-.*$/, "");

    const foundCenter = centerData.find(
      (center) => center.name === pureClusterName,
    );

    if (foundCenter) {
      return foundCenter;
    } else {
      console.warn(`Cluster center not found: ${clusterName}`);
      return null;
    }
  }

  return null;
}

export { getClusterCenter };
