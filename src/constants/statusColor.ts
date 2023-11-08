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
    case "unknown":
    default:
      thisColor = "bg-unknown";
      break;
  }

  return thisColor;
}

export default statusColor;
