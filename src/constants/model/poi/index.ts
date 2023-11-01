export const poiStatusName = {
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

  // for debug
  unknown: "unknown",
};

export const poiStatusNameMessageKeys = {
  // 物體的回報狀態
  [poiStatusName.maintenance]: "poi.data.status.maintenance",
  [poiStatusName.function]: "poi.data.status.function",
  [poiStatusName.outlook]: "poi.data.status.outlook",
  [poiStatusName.occupation]: "poi.data.status.occupation",

  // 空間的回報狀態
  [poiStatusName.spaceUsage]: "poi.data.status.spaceUsage",
  [poiStatusName.crowd]: "poi.data.status.crowd",
  [poiStatusName.noise]: "poi.data.status.noise",
  [poiStatusName.thermalComfort]: "poi.data.status.thermalComfort",

  // 物體空間共用
  [poiStatusName.cleanliness]: "poi.data.status.cleanliness",

  // for debug
  [poiStatusName.unknown]: "poi.data.status.unknown",
};

export const poiStatusDescription = {
  // 物體的回報狀態描述
  // 保養狀態 maintenance
  maintenanceCompleted: "maintenanceCompleted", // 保養完成
  underMaintenance: "underMaintenance", // 保養中
  // 功能狀態 function
  functional: "functional", // 功能正常
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
  // 清潔狀態 cleanliness
  highCleanliness: "highCleanliness", // 整潔
  normalCleanliness: "normalCleanliness", // 普通
  lowCleanliness: "lowCleanliness", // 髒亂
};

export const poiStatusDescriptionMessageKeys = {
  // 物體的回報狀態描述
  // 保養狀態
  [poiStatusDescription.maintenanceCompleted]:
    "poi.data.statusDescription.maintenanceCompleted",
  [poiStatusDescription.underMaintenance]:
    "poi.data.statusDescription.underMaintenance",
  // 功能狀態
  [poiStatusDescription.functional]: "poi.data.statusDescription.functional",
  [poiStatusDescription.remainsFuntional]:
    "poi.data.statusDescription.remainsFunctional",
  [poiStatusDescription.nonFunctional]:
    "poi.data.statusDescription.nonFunctional",
  // 外觀狀態
  [poiStatusDescription.outlookFlawless]:
    "poi.data.statusDescription.outlookFlawless",
  [poiStatusDescription.outlookDeteriorated]:
    "poi.data.statusDescription.outlookDeteriorated",
  // 占用狀態
  [poiStatusDescription.occupied]: "poi.data.statusDescription.occupied",
  [poiStatusDescription.unoccupied]: "poi.data.statusDescription.unoccipied",

  // 空間的回報狀態描述
  // 使用狀態
  [poiStatusDescription.spacesAvailable]:
    "poi.data.statusDescription.spacesAvailable",
  [poiStatusDescription.limitedSpaces]:
    "poi.data.statusDescription.limitedSpaces",
  [poiStatusDescription.noSpaces]: "poi.data.statusDescription.noSpaces",
  // 人潮狀態
  [poiStatusDescription.crowded]: "poi.data.statusDescription.crowded",
  [poiStatusDescription.normalCrowded]:
    "poi.data.statusDescription.normalCrowded",
  [poiStatusDescription.noSpaces]: "poi.data.statusDescription.noSpaces",
  // 噪音狀態
  [poiStatusDescription.quiet]: "poi.data.statusDescription.quiet",
  [poiStatusDescription.normalNoiseLevel]:
    "poi.data.statusDescription.normalNoiseLevel",
  [poiStatusDescription.noisy]: "poi.data.statusDescription.noisy",
  // 體感狀態
  [poiStatusDescription.comfortable]: "poi.data.statusDescription.comfortable",
  [poiStatusDescription.normalComfort]:
    "poi.data.statusDescription.normalComfort",
  [poiStatusDescription.uncomfortable]:
    "poi.data.statusDescription.uncomfortable",

  // 物體空間共用狀態描述
  // 清潔狀態
  [poiStatusDescription.highCleanliness]:
    "poi.data.statusDescription.highCleanliness",
  [poiStatusDescription.normalCleanliness]:
    "poi.data.statusDescription.normalCleanliness",
  [poiStatusDescription.lowCleanliness]:
    "poi.data.statusDescription.lowCleanliness",
};
