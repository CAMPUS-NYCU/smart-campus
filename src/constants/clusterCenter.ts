import centerData from "../assets/data/clusterCenters/clusterCenter.json";

function getClusterCenter(clusterName: string) {
  if (clusterName) {
    const matches = clusterName.match(/[^a-zA-Z\d]+/g);
    const pureClusterName = matches ? matches.join("") : "";

    const foundCenter = centerData.find(
      (center) => center.name === pureClusterName,
    );

    if (foundCenter) {
      return foundCenter;
    }
  }

  return null;
}

export { getClusterCenter };
