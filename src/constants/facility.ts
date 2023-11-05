import { Facilities } from "../models/facility";
import shineMoodCCData from "../assets/data/markers/facilities/shinemood-cc.json"; // 小木屋&校計中
import eng3Eng4Data from "../assets/data/markers/facilities/eng3-eng4.json";
import caCafe1Data from "../assets/data/markers/facilities/ca-cafe1.json";
import parkingLotCafe2Data from "../assets/data/markers/facilities/parkinglot-cafe2.json";
import swimMultiGymData from "../assets/data/markers/facilities/swim-multigym.json";
import outdoorFieldData from "../assets/data/markers/facilities/outdoor-field.json";
import oldGymData from "../assets/data/markers/facilities/oldgym.json";
import libraryData from "../assets/data/markers/facilities/library.json";

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

    case /^活動中心&一餐/.test(clusterName):
      facilities = caCafe1Data;
      break;

    case /^二餐&停車場/.test(clusterName):
      facilities = parkingLotCafe2Data;
      break;

    case /^游泳館&綜合球館/.test(clusterName):
      facilities = swimMultiGymData;
      break;

    case /^室外球場/.test(clusterName):
      facilities = outdoorFieldData;
      break;

    case /^舊體育館/.test(clusterName):
      facilities = oldGymData;
      break;

    case /^圖書館/.test(clusterName):
      facilities = libraryData;
      break;

    default:
      console.error("未知的地點:", clusterName);
      break;
  }

  return facilities;
}

export { getLocations };
