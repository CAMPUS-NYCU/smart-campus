import { PoiStatusType } from "../../../../models/poi";

import poiMarkerCleanliness from "../../../../assets/images/poiMarkerCleanliness.svg"; // 清潔狀態
import poiMarkerCrowd from "../../../../assets/images/poiMarkerCrowd.svg"; // 人潮狀態
import poiMarkerFunction from "../../../../assets/images/poiMarkerFunction.svg"; // 功能狀態
import poiMarkerMaintenance from "../../../../assets/images/poiMarkerMaintenance.svg"; // 保養狀態
import poiMarkerNoise from "../../../../assets/images/poiMarkerNoise.svg"; // 噪音狀態
import poiMarkerOccupation from "../../../../assets/images/poiMarkerOccupation.svg"; // 占用狀態
import poiMarkerAppearance from "../../../../assets/images/poiMarkerAppearance.svg"; // 外觀狀態
import poiMarkerThermalComfort from "../../../../assets/images/poiMarkerThermalComfort.svg"; // 體感狀態
import poiMarkerUsage from "../../../../assets/images/poiMarkerUsage.svg"; // 使用狀態
import poiMarkerUnknown from "../../../../assets/images/poiMarkerUnknown.svg"; // 未知

import poiMarkerHighlightedAppearance from "../../../../assets/images/poiMarkerHighlightedAppearance.svg"; // 高亮外觀狀態
import poiMarkerHighlightedCleanliness from "../../../../assets/images/poiMarkerHighlightedCleanliness.svg"; // 高亮清潔狀態
import poiMarkerHighlightedCrowd from "../../../../assets/images/poiMarkerHighlightedCrowd.svg"; // 高亮人潮狀態
import poiMarkerHighlightedFunction from "../../../../assets/images/poiMarkerHighlightedFunction.svg"; // 高亮功能狀態
import poiMarkerHighlightedMaintenance from "../../../../assets/images/poiMarkerHighlightedMaintenance.svg"; // 高亮保養狀態
import poiMarkerHighlightedNoise from "../../../../assets/images/poiMarkerHighlightedNoise.svg"; // 高亮噪音狀態
import poiMarkerHighlightedOccupation from "../../../../assets/images/poiMarkerHighlightedOccupation.svg"; // 高亮占用狀態
import poiMarkerHighlightedThermalComfort from "../../../../assets/images/poiMarkerHighlightedThermalComfort.svg"; // 高亮體感狀態
import poiMarkerHighlightedUsage from "../../../../assets/images/poiMarkerHighlightedUsage.svg"; // 高亮使用狀態

export const getIcon = (status: PoiStatusType): google.maps.Icon => {
  let thisUrl: string;
  switch (status) {
    case "cleanliness":
      thisUrl = poiMarkerCleanliness;
      break;
    case "crowd":
      thisUrl = poiMarkerCrowd;
      break;
    case "function":
      thisUrl = poiMarkerFunction;
      break;
    case "maintenance":
      thisUrl = poiMarkerMaintenance;
      break;
    case "noise":
      thisUrl = poiMarkerNoise;
      break;
    case "occupation":
      thisUrl = poiMarkerOccupation;
      break;
    case "appearance":
      thisUrl = poiMarkerAppearance;
      break;
    case "thermalComfort":
      thisUrl = poiMarkerThermalComfort;
      break;
    case "usage":
      thisUrl = poiMarkerUsage;
      break;
    default:
      thisUrl = poiMarkerUnknown;
      break;
  }

  return {
    url: thisUrl,
    scaledSize: new google.maps.Size(28, 30),
  };
};

export const getHighlightedIcon = (status: PoiStatusType): google.maps.Icon => {
  let thisUrl: string;

  switch (status) {
    case "cleanliness":
      thisUrl = poiMarkerHighlightedCleanliness;
      break;
    case "crowd":
      thisUrl = poiMarkerHighlightedCrowd;
      break;
    case "function":
      thisUrl = poiMarkerHighlightedFunction;
      break;
    case "maintenance":
      thisUrl = poiMarkerHighlightedMaintenance;
      break;
    case "noise":
      thisUrl = poiMarkerHighlightedNoise;
      break;
    case "occupation":
      thisUrl = poiMarkerHighlightedOccupation;
      break;
    case "appearance":
      thisUrl = poiMarkerHighlightedAppearance;
      break;
    case "thermalComfort":
      thisUrl = poiMarkerHighlightedThermalComfort;
      break;
    case "usage":
      thisUrl = poiMarkerHighlightedUsage;
      break;
    default:
      thisUrl = poiMarkerUnknown;
      break;
  }

  return {
    url: thisUrl,
    scaledSize: new google.maps.Size(28, 30),
  };
};
