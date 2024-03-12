function getDrawerTitle(clusterName: string) {
  return clusterName.replace(/[0-9A-Za-z]+/g, "");
}

export { getDrawerTitle };
