import { Facilities } from "../models/facility";
import shineMoodCCData from "../assets/data/markers/facilities/shinemood-cc.json"; // 小木屋&校計中
import eng3Eng4Data from "../assets/data/markers/facilities/eng3-eng4.json";

function getLocations(clusterName: string): Facilities {
  let facilities: Facilities = {};
  // let dataFromJson: DataFromJson = [];

  switch (true) {
    case /^小木屋&校計中/.test(clusterName):
      facilities = shineMoodCCData;
      break;

    case /^工三&工四/.test(clusterName):
      facilities = eng3Eng4Data;
      break;

    default:
      console.error("未知的地點:", clusterName);
      break;
  }

  return facilities;
}

export { getLocations };
