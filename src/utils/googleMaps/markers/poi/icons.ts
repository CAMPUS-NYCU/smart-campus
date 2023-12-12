import { PoiStatusType } from "../../../../models/poi";

import poiMarkerCleanliness from "../../../../assets/images/poiMarkerCleanliness.svg";
import poiMarkerCrowd from "../../../../assets/images/poiMarkerCrowd.svg";
import poiMarkerFunction from "../../../../assets/images/poiMarkerFunction.svg";
import poiMarkerMaintenance from "../../../../assets/images/poiMarkerMaintenance.svg";
import poiMarkerNoise from "../../../../assets/images/poiMarkerNoise.svg";
import poiMarkerOccupation from "../../../../assets/images/poiMarkerOccupation.svg";
import poiMarkerAppearance from "../../../../assets/images/poiMarkerAppearance.svg";
import poiMarkerThermalComfort from "../../../../assets/images/poiMarkerThermalComfort.svg";
import poiMarkerUsage from "../../../../assets/images/poiMarkerUsage.svg";
import poiMarkerUnknown from "../../../../assets/images/poiMarkerUnknown.svg";

import poiMarkerHighlightedAppearance from "../../../../assets/images/poiMarkerHighlightedAppearance.svg";
import poiMarkerHighlightedCleanliness from "../../../../assets/images/poiMarkerHighlightedCleanliness.svg";
import poiMarkerHighlightedCrowd from "../../../../assets/images/poiMarkerHighlightedCrowd.svg";
import poiMarkerHighlightedFunction from "../../../../assets/images/poiMarkerHighlightedFunction.svg";
import poiMarkerHighlightedMaintenance from "../../../../assets/images/poiMarkerHighlightedMaintenance.svg";
import poiMarkerHighlightedNoise from "../../../../assets/images/poiMarkerHighlightedNoise.svg";
import poiMarkerHighlightedOccupation from "../../../../assets/images/poiMarkerHighlightedOccupation.svg";
import poiMarkerHighlightedThermalComfort from "../../../../assets/images/poiMarkerHighlightedThermalComfort.svg";
import poiMarkerHighlightedUsage from "../../../../assets/images/poiMarkerHighlightedUsage.svg";

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
