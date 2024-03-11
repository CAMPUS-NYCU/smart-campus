import libraryFloor from "../assets/data/options/library/floor.json";
import libraryTargetCategory from "../assets/data/options/library/target-category.json";
import libraryTargetName from "../assets/data/options/library/target-name.json";
import libraryTargetSerial from "../assets/data/options/library/target-serial.json";
import multiFloorLibraryFloor from "../assets/data/options/multi-floor-library/floor.json";
import multiFloorLibraryTargetCategory from "../assets/data/options/multi-floor-library/target-category.json";
import multiFloorLibraryTargetName from "../assets/data/options/multi-floor-library/target-name.json";
import multiFloorLibraryTargetSerial from "../assets/data/options/multi-floor-library/target-serial.json";
import outdoorFieldFloor from "../assets/data/options/outdoor-field/floor.json";
import outdoorFieldTargetCategory from "../assets/data/options/outdoor-field/target-category.json";
import outdoorFieldTargetName from "../assets/data/options/outdoor-field/target-name.json";
import outdoorFieldTargetSerial from "../assets/data/options/outdoor-field/target-serial.json";
import shineMoodCCFloor from "../assets/data/options/shinemood-cc/floor.json";
import shineMoodCCTargetCategory from "../assets/data/options/shinemood-cc/target-category.json";
import shineMoodCCTargetName from "../assets/data/options/shinemood-cc/target-name.json";
import shineMoodCCTargetSerial from "../assets/data/options/shinemood-cc/target-serial.json";

function getOptions(clusterName: string) {
  switch (true) {
    case /^小木屋&校計中/.test(clusterName):
      return {
        floor: shineMoodCCFloor,
        targetCategory: shineMoodCCTargetCategory,
        targetName: shineMoodCCTargetName,
        targetSerial: shineMoodCCTargetSerial,
      };

    case /^多樓層圖書館/.test(clusterName):
      return {
        floor: multiFloorLibraryFloor,
        targetCategory: multiFloorLibraryTargetCategory,
        targetName: multiFloorLibraryTargetName,
        targetSerial: multiFloorLibraryTargetSerial,
      };

    case /^圖書館/.test(clusterName):
      return {
        floor: libraryFloor,
        targetCategory: libraryTargetCategory,
        targetName: libraryTargetName,
        targetSerial: libraryTargetSerial,
      };

    case /^室外球場/.test(clusterName):
      return {
        floor: outdoorFieldFloor,
        targetCategory: outdoorFieldTargetCategory,
        targetName: outdoorFieldTargetName,
        targetSerial: outdoorFieldTargetSerial,
      };

    default:
      return {
        floor: [""],
        targetCategory: [{ floor: "", category: [""] }],
        targetName: [{ floor: "", category: "", name: [""] }],
        targetSerial: [{ floor: "", category: "", name: "", serial: [""] }],
      };
  }
}

export { getOptions };
