import poiDrawerAppearance from "../assets/images/poiDrawerAppearance.svg";
import poiDrawerCleanliness from "../assets/images/poiDrawerCleanliness.svg";
import poiDrawerCrowd from "../assets/images/poiDrawerCrowd.svg";
import poiDrawerFunction from "../assets/images/poiDrawerFunction.svg";
import poiDrawerMaintenance from "../assets/images/poiDrawerMaintenance.svg";
import poiDrawerNoise from "../assets/images/poiDrawerNoise.svg";
import poiDrawerOccupation from "../assets/images/poiDrawerOccupation.svg";
import poiDrawerThermalComfort from "../assets/images/poiDrawerThermalComfort.svg";
import poiDrawerUsage from "../assets/images/poiDrawerUsage.svg";

function statusColor(type: string) {
  let thisColor: string;

  switch (type) {
    case "maintenance":
      thisColor = "bg-maintenance";
      break;
    case "function":
      thisColor = "bg-function";
      break;
    case "appearance":
      thisColor = "bg-appearance";
      break;
    case "occupation":
      thisColor = "bg-occupation";
      break;
    case "usage":
      thisColor = "bg-usage";
      break;
    case "crowd":
      thisColor = "bg-crowd";
      break;
    case "noise":
      thisColor = "bg-noise";
      break;
    case "thermalComfort":
      thisColor = "bg-thermalComfort";
      break;
    case "cleanliness":
      thisColor = "bg-cleanliness";
      break;
    default:
      thisColor = "bg-secondary";
      break;
  }

  return thisColor;
}

function statusIcon(type: string) {
  let thisIcon: string;

  switch (type) {
    case "maintenance":
      thisIcon = poiDrawerMaintenance;
      break;
    case "function":
      thisIcon = poiDrawerFunction;
      break;
    case "appearance":
      thisIcon = poiDrawerAppearance;
      break;
    case "occupation":
      thisIcon = poiDrawerOccupation;
      break;
    case "usage":
      thisIcon = poiDrawerUsage;
      break;
    case "crowd":
      thisIcon = poiDrawerCrowd;
      break;
    case "noise":
      thisIcon = poiDrawerNoise;
      break;
    case "thermalComfort":
      thisIcon = poiDrawerThermalComfort;
      break;
    case "cleanliness":
      thisIcon = poiDrawerCleanliness;
      break;
    default:
      thisIcon = "";
  }
  return thisIcon;
}

export { statusColor, statusIcon };
