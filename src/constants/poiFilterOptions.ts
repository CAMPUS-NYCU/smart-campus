import libraryFloor from "../assets/data/poiFilters/library/floor.json";
import libraryTargetName from "../assets/data/poiFilters/library/target-name.json";
import multiFloorLibraryFloor from "../assets/data/poiFilters/multi-floor-library/floor.json";
import multiFloorLibraryTargetName from "../assets/data/poiFilters/multi-floor-library/target-name.json";
import shinemoodCCFloor from "../assets/data/poiFilters/shinemood-cc/floor.json";
import shinemoodCCTargetName from "../assets/data/poiFilters/shinemood-cc/target-name.json";
import { poiAllStatusTypeSelect } from "./model/poi";

function getPoiFilterOptions(clusterName: string) {
  switch (true) {
    case /^小木屋&校計中/.test(clusterName):
      return {
        floor: shinemoodCCFloor,
        targetName: shinemoodCCTargetName,
        status: poiAllStatusTypeSelect,
      };

    case /^圖書館/.test(clusterName):
      return {
        floor: libraryFloor,
        targetName: libraryTargetName,
        status: poiAllStatusTypeSelect,
      };

    case /^多樓層圖書館/.test(clusterName):
      return {
        floor: multiFloorLibraryFloor,
        targetName: multiFloorLibraryTargetName,
        status: poiAllStatusTypeSelect,
      };

    default:
      console.error("未知的地點:", clusterName);
      return {
        floor: [""],
        targetName: [""],
        status: [""],
      };
  }
}

export { getPoiFilterOptions };
