import caCafe1Floor from "../assets/data/options/ca-cafe1/floor.json";
import caCafe1TargetCategory from "../assets/data/options/ca-cafe1/target-category.json";
import caCafe1TargetName from "../assets/data/options/ca-cafe1/target-name.json";
import eng3Eng4Floor from "../assets/data/options/eng3-eng4/floor.json";
import eng3Eng4TargetCategory from "../assets/data/options/eng3-eng4/target-category.json";
import eng3Eng4TargetName from "../assets/data/options/eng3-eng4/target-name.json";
import libraryFloor from "../assets/data/options/library/floor.json";
import libraryTargetCategory from "../assets/data/options/library/target-category.json";
import libraryTargetName from "../assets/data/options/library/target-name.json";
import oldGymFloor from "../assets/data/options/oldgym/floor.json";
import oldGymTargetCategory from "../assets/data/options/oldgym/target-category.json";
import oldGymTargetName from "../assets/data/options/oldgym/target-name.json";
import outdoorFieldFloor from "../assets/data/options/outdoor-field/floor.json";
import outdoorFieldTargetCategory from "../assets/data/options/outdoor-field/target-category.json";
import outdoorFieldTargetName from "../assets/data/options/outdoor-field/target-name.json";
import parkingLotCafe2Floor from "../assets/data/options/parkinglot-cafe2/floor.json";
import parkingLotCafe2TargetCategory from "../assets/data/options/parkinglot-cafe2/target-category.json";
import parkingLotCafe2TargetName from "../assets/data/options/parkinglot-cafe2/target-name.json";
import shineMoodCCFloor from "../assets/data/options/shinemood-cc/floor.json";
import shineMoodCCTargetCategory from "../assets/data/options/shinemood-cc/target-category.json";
import shineMoodCCTargetName from "../assets/data/options/shinemood-cc/target-name.json";
import swimMultiGymFloor from "../assets/data/options/swim-multigym/floor.json";
import swimMultiGymTargetCategory from "../assets/data/options/swim-multigym/target-category.json";
import swimMultiGymTargetName from "../assets/data/options/swim-multigym/target-name.json";

function getOptions(clusterName: string) {
  switch (true) {
    case /^小木屋&校計中/.test(clusterName):
      return {
        floor: shineMoodCCFloor,
        targetCategory: shineMoodCCTargetCategory,
        targetName: shineMoodCCTargetName,
      };

    case /^工三&工四/.test(clusterName):
      return {
        floor: eng3Eng4Floor,
        targetCategory: eng3Eng4TargetCategory,
        targetName: eng3Eng4TargetName,
      };

    case /^活動中心&一餐/.test(clusterName):
      return {
        floor: caCafe1Floor,
        targetCategory: caCafe1TargetCategory,
        targetName: caCafe1TargetName,
      };

    case /^二餐&停車場/.test(clusterName):
      return {
        floor: parkingLotCafe2Floor,
        targetCategory: parkingLotCafe2TargetCategory,
        targetName: parkingLotCafe2TargetName,
      };

    case /^游泳館&綜合球館/.test(clusterName):
      return {
        floor: swimMultiGymFloor,
        targetCategory: swimMultiGymTargetCategory,
        targetName: swimMultiGymTargetName,
      };

    case /^室外球場/.test(clusterName):
      return {
        floor: outdoorFieldFloor,
        targetCategory: outdoorFieldTargetCategory,
        targetName: outdoorFieldTargetName,
      };

    case /^舊體育館/.test(clusterName):
      return {
        floor: oldGymFloor,
        targetCategory: oldGymTargetCategory,
        targetName: oldGymTargetName,
      };

    case /^圖書館/.test(clusterName):
      return {
        floor: libraryFloor,
        targetCategory: libraryTargetCategory,
        targetName: libraryTargetName,
      };

    default:
      return {
        floor: [""],
        targetCategory: [{ floor: "", category: [""] }],
        targetName: [{ floor: "", category: "", name: [""] }],
      };
  }
}

export { getOptions };
