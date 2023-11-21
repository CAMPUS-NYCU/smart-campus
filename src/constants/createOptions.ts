import caCafe1FloorTargetCate from "../assets/data/options/ca-cafe1/floor-target-cate.json";
import caCafe1TargetCateName from "../assets/data/options/ca-cafe1/target-cate-name.json";
import caCafe1TargetSerial from "../assets/data/options/ca-cafe1/target-serial.json";
import eng3Eng4FloorTargetCate from "../assets/data/options/eng3-eng4/floor-target-cate.json";
import eng3Eng4TargetCateName from "../assets/data/options/eng3-eng4/target-cate-name.json";
import eng3Eng4TargetSerial from "../assets/data/options/eng3-eng4/target-serial.json";
import libraryFloorTargetCate from "../assets/data/options/library/floor-target-cate.json";
import libraryTargetCateName from "../assets/data/options/library/target-cate-name.json";
import libraryTargetSerial from "../assets/data/options/library/target-serial.json";
import oldgymFloorTargetCate from "../assets/data/options/oldgym/floor-target-cate.json";
import oldgymTargetCateName from "../assets/data/options/oldgym/target-cate-name.json";
import oldgymTargetSerial from "../assets/data/options/oldgym/target-serial.json";
import outdoorFieldFloorTargetCate from "../assets/data/options/outdoor-field/floor-target-cate.json";
import outdoorFieldTargetCateName from "../assets/data/options/outdoor-field/target-cate-name.json";
import outdoorFieldTargetSerial from "../assets/data/options/outdoor-field/target-serial.json";
import parkinglotCafe2FloorTargetCate from "../assets/data/options/parkinglot-cafe2/floor-target-cate.json";
import parkinglotCafe2TargetCateName from "../assets/data/options/parkinglot-cafe2/target-cate-name.json";
import parkinglotCafe2TargetSerial from "../assets/data/options/parkinglot-cafe2/target-serial.json";
import shinemoodCcfloorTargetCate from "../assets/data/options/shinemood-cc/floor-target-cate.json";
import shinemoodCCTargetCateName from "../assets/data/options/shinemood-cc/target-cate-name.json";
import shinemoodCCTargetSerial from "../assets/data/options/shinemood-cc/target-serial.json";
import swimMultigymFloorTargetCate from "../assets/data/options/swim-multigym/floor-target-cate.json";
import swimMultigymTargetCateName from "../assets/data/options/swim-multigym/target-cate-name.json";
import swimMultigymTargetSerial from "../assets/data/options/swim-multigym/target-serial.json";

function getOptions(clusterName: string) {
  switch (true) {
    case /^小木屋&校計中/.test(clusterName):
      return {
        floorTargetCate: shinemoodCcfloorTargetCate,
        targetCateName: shinemoodCCTargetCateName,
        targetSerial: shinemoodCCTargetSerial,
      };

    case /^工三&工四/.test(clusterName):
      return {
        floorTargetCate: eng3Eng4FloorTargetCate,
        targetCateName: eng3Eng4TargetCateName,
        targetSerial: eng3Eng4TargetSerial,
      };

    case /^活動中心&一餐/.test(clusterName):
      return {
        floorTargetCate: caCafe1FloorTargetCate,
        targetCateName: caCafe1TargetCateName,
        targetSerial: caCafe1TargetSerial,
      };

    case /^二餐&停車場/.test(clusterName):
      return {
        floorTargetCate: parkinglotCafe2FloorTargetCate,
        targetCateName: parkinglotCafe2TargetCateName,
        targetSerial: parkinglotCafe2TargetSerial,
      };

    case /^游泳館&綜合球館/.test(clusterName):
      return {
        floorTargetCate: swimMultigymFloorTargetCate,
        targetCateName: swimMultigymTargetCateName,
        targetSerial: swimMultigymTargetSerial,
      };

    case /^室外球場/.test(clusterName):
      return {
        floorTargetCate: outdoorFieldFloorTargetCate,
        targetCateName: outdoorFieldTargetCateName,
        targetSerial: outdoorFieldTargetSerial,
      };

    case /^舊體育館/.test(clusterName):
      return {
        floorTargetCate: oldgymFloorTargetCate,
        targetCateName: oldgymTargetCateName,
        targetSerial: oldgymTargetSerial,
      };

    case /^圖書館/.test(clusterName):
      return {
        floorTargetCate: libraryFloorTargetCate,
        targetCateName: libraryTargetCateName,
        targetSerial: libraryTargetSerial,
      };

    default:
      console.error("未知的地點:", clusterName);
      return {};
  }
}

export { getOptions };
