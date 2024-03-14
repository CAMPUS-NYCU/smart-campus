function getDrawerTitle(clusterName: string) {
  // for research requirement. other cluster name may not be properly handled
  // 1. remove the number after a Chinese character of the cluster name
  // 2. remove the character from the dash (-) to the end of the cluster name
  return clusterName.replace(/(\p{Script=Han})\d+/gu, "$1").replace(/-.*$/, "");
}

export { getDrawerTitle };
