import { PoiData } from "../../../../models/poi";

import poiMarkerClean from "../../../../assets/images/poiMarkerClean.svg"; // 清潔狀態
import poiMarkerCrowd from "../../../../assets/images/poiMarkerCrowd.svg"; // 人潮狀態
import poiMarkerFunction from "../../../../assets/images/poiMarkerFunction.svg"; // 功能狀態
import poiMarkerMaintenance from "../../../../assets/images/poiMarkerMaintenance.svg"; // 保養狀態
import poiMarkerNoise from "../../../../assets/images/poiMarkerNoise.svg"; // 噪音狀態
import poiMarkerOccupation from "../../../../assets/images/poiMarkerOccupation.svg"; // 占用狀態
import poiMarkerOutlook from "../../../../assets/images/poiMarkerOutlook.svg"; // 外觀狀態
import poiMarkerThermalComfort from "../../../../assets/images/poiMarkerThermalComfort.svg"; // 體感狀態
import poiMarkerUsage from "../../../../assets/images/poiMarkerUsage.svg"; // 使用狀態
import poiMarkerUnknown from "../../../../assets/images/poiMarkerUnknown.svg"; // 未知

export const getIcon = (status: PoiStatus): google.maps.Icon => {
  let thisUrl: string;
  switch (poiData.status) {
    case "clean":
      thisUrl = poiMarkerClean;
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
    case "outlook":
      thisUrl = poiMarkerOutlook;
      break;
    case "thermalcomfort":
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
