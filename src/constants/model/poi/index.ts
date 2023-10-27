export const poiStatus = {
  unknown: "unknown",
  // 物體的回報狀態
  maintenance: "maintenance",
  function: "function",
  outlook: "outlook",
  occupation: "occupation",

  // 空間的回報狀態
  spaceUsage: "spaceUsage",
  crowd: "crowd",
  noise: "noise",
  thermalComfort: "thermalComfort",

  // 物體空間共用
  cleanliness: "cleanliness",
};

export const poiStatusMessageKeys = {
  [poiStatus.unknown]: "poi.data.status.unknown",
  // 物體的回報狀態
  [poiStatus.maintenance]: "poi.data.status.maintenance",
  [poiStatus.function]: "poi.data.status.function",
  [poiStatus.outlook]: "poi.data.status.outlook",
  [poiStatus.occupation]: "poi.data.status.occupation",

  // 空間的回報狀態
  [poiStatus.spaceUsage]: "poi.data.status.spaceUsage",
  [poiStatus.crowd]: "poi.data.status.crowd",
  [poiStatus.noise]: "poi.data.status.noise",
  [poiStatus.thermalComfort]: "poi.data.status.thermalComfort",

  // 物體空間共用
  [poiStatus.cleanliness]: "poi.data.status.cleanliness",
};

export const poiStatusDescription = {
  // 物體的回報狀態描述
  // 保養狀態 maintenance
  maintenanceCompleted: "maintenanceCompleted", // 保養完成
  underMaintenance: "underMaintenance", // 保養中
  // 功能狀態 function
  functaional: "functaional", // 功能正常
  remainsFuntional: "remainsFuntional", // 尚可使用
  nonFunctional: "nonFunctional", // 無法使用
  // 外觀狀態 outlook
  outlookFlawless: "outlookFlawless", // 完好無損
  outlookDeteriorated: "outlookDeteriorated", // 外觀破損
  // 占用狀態 occupation
  unoccupied: "unoccupied", // 無人使用
  occupied: "occupied", // 有人占用

  // 空間的回報狀態描述
  // 使用狀態 spaceUsage
  spacesAvailable: "spacesAvailable", // 尚有空位
  limitedSpaces: "limitedSpaces", // 空位有限
  noSpaces: "noSpaces", // 已無空位
  // 人潮狀態 crowd
  crowded: "crowded", // 擁擠
  normalCrowded: "normalCrowded", // 普通
  notCrowded: "notCrowded", // 沒人
  // 噪音狀態 noise
  quiet: "quiet", // 安靜
  normalNoiseLevel: "normalNoiseLevel", // 普通
  noisy: "noisy", // 吵雜
  // 體感狀態 thermalComfort
  comfortable: "comfortable", // 舒適
  normalComfort: "normalComfort", // 普通
  uncomfortable: "uncomfortable", // 不適

  // 物體空間共用狀態描述
  // 整潔狀態 cleanliness
  highCleanliness: "highCleanliness", // 整潔
  normalCleanliness: "normalCleanliness", // 普通
  lowCleanliness: "lowCleanliness", // 髒亂
};
