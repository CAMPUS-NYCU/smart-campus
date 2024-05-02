import { Pois, PoisForGpt } from "../models/poi";

function convertToContributionData(docs: Pois): PoisForGpt {
  const contributionData: {
    [key: string]: {
      物體: string;
      回報狀態: string;
      回報時間: string;
      位址: [number, number];
    };
  } = {};
  // 狀態要判斷
  Object.entries(docs).forEach(([id, data]) => {
    contributionData[id] = {
      物體: data.target.serial,
      回報狀態: data.status.type,
      回報時間: data.createdAt,
      位址: [data.latlng.latitude, data.latlng.longitude],
    };
  });
  return contributionData;
}

function changeStatusToEnglish(status: string) {
  switch (status) {
    case "保養":
      return "maintenance";
    case "功能":
      return "function";
    case "外觀":
      return "appearance";
    case "佔用":
      return "occupation";
    case "體驗":
      return "experience";
    case "預約":
      return "reservation";
    case "清潔":
      return "cleanliness";
    case "空位":
      return "space";
    case "人潮":
      return "crowd";
    case "噪音":
      return "noise";
    case "氣味":
      return "odor";
    default:
      return "";
  }
}

export { convertToContributionData, changeStatusToEnglish };
