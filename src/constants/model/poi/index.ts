export const poiStatusType = {
  // 物體的回報狀態
  maintenance: "maintenance",
  function: "function",
  appearance: "appearance",
  occupation: "occupation",

  // 空間的回報狀態
  usage: "usage",
  crowd: "crowd",
  noise: "noise",
  thermalComfort: "thermalComfort",

  // 物體空間共用
  cleanliness: "cleanliness",

  // 請選擇
  empty: "empty",

  // for debug
  unknown: "unknown",
};

export const poiStatusTypeMessageKeys = {
  // 物體的回報狀態
  [poiStatusType.maintenance]: "poi.data.status.maintenance.name",
  [poiStatusType.function]: "poi.data.status.function.name",
  [poiStatusType.appearance]: "poi.data.status.appearance.name",
  [poiStatusType.occupation]: "poi.data.status.occupation.name",

  // 空間的回報狀態
  [poiStatusType.usage]: "poi.data.status.usage.name",
  [poiStatusType.crowd]: "poi.data.status.crowd.name",
  [poiStatusType.noise]: "poi.data.status.noise.name",
  [poiStatusType.thermalComfort]: "poi.data.status.thermalComfort.name",

  // 物體空間共用
  [poiStatusType.cleanliness]: "poi.data.status.cleanliness.name",

  // 請選擇
  [poiStatusType.empty]: "poi.data.status.empty.name",

  // for debug
  [poiStatusType.unknown]: "poi.data.status.unknown.name",
};

export const poiStatusValue = {
  // 物體的回報狀態描述
  // 保養狀態 maintenance
  maintenanceCompleted: "maintenanceCompleted", // 保養完成
  underMaintenance: "underMaintenance", // 保養中
  // 功能狀態 function
  functional: "functional", // 功能正常
  remainsFuntional: "remainsFuntional", // 尚可使用
  nonFunctional: "nonFunctional", // 無法使用
  // 外觀狀態 appearance
  appearanceGood: "appearanceGood", // 完好無損
  appearanceBad: "appearanceBad", // 外觀破損
  // 占用狀態 occupation
  unoccupied: "unoccupied", // 無人使用
  occupied: "occupied", // 有人占用

  // 空間的回報狀態描述
  // 使用狀態 usage
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
  goodCleanliness: "goodCleanliness", // 整潔
  normalCleanliness: "normalCleanliness", // 普通
  badCleanliness: "badCleanliness", // 髒亂

  // 請選擇
  empty: "empty",

  // for debug
  unknown: "unknown",
};

export const poiStatusValueMessageKeys = {
  // 物體的回報狀態描述
  // 保養狀態
  [poiStatusValue.maintenanceCompleted]:
    "poi.data.status.maintenance.value.completed",
  [poiStatusValue.underMaintenance]:
    "poi.data.status.maintenance.value.processing",
  // 功能狀態
  [poiStatusValue.functional]: "poi.data.status.function.value.good",
  [poiStatusValue.remainsFuntional]: "poi.data.status.function.value.ok",
  [poiStatusValue.nonFunctional]: "poi.data.status.function.value.broken",
  // 外觀狀態
  [poiStatusValue.appearanceGood]: "poi.data.status.appearance.value.good",
  [poiStatusValue.appearanceBad]: "poi.data.status.appearance.value.bad",
  // 占用狀態
  [poiStatusValue.occupied]: "poi.data.status.occupation.value.occupied",
  [poiStatusValue.unoccupied]: "poi.data.status.occupation.value.unoccupied",

  // 空間的回報狀態描述
  // 使用狀態
  [poiStatusValue.spacesAvailable]: "poi.data.status.usage.value.available",
  [poiStatusValue.limitedSpaces]: "poi.data.status.usage.value.limited",
  [poiStatusValue.noSpaces]: "poi.data.status.usage.value.noSpaces",
  // 人潮狀態
  [poiStatusValue.crowded]: "poi.data.status.crowd.value.dense",
  [poiStatusValue.normalCrowded]: "poi.data.status.crowd.value.normal",
  [poiStatusValue.notCrowded]: "poi.data.status.crowd.value.sparse",
  // 噪音狀態
  [poiStatusValue.quiet]: "poi.data.status.noise.value.quiet",
  [poiStatusValue.normalNoiseLevel]: "poi.data.status.noise.value.normal",
  [poiStatusValue.noisy]: "poi.data.status.noise.value.noisy",
  // 體感狀態
  [poiStatusValue.comfortable]:
    "poi.data.status.thermalComfort.value.comfortable",
  [poiStatusValue.normalComfort]: "poi.data.status.thermalComfort.value.normal",
  [poiStatusValue.uncomfortable]:
    "poi.data.status.thermalComfort.value.uncomfortable",

  // 物體空間共用狀態描述
  // 清潔狀態
  [poiStatusValue.goodCleanliness]: "poi.data.status.cleanliness.value.good",
  [poiStatusValue.normalCleanliness]:
    "poi.data.status.cleanliness.value.normal",
  [poiStatusValue.badCleanliness]: "poi.data.status.cleanliness.value.bad",

  // 請選擇
  [poiStatusValue.empty]: "poi.data.status.empty.value.empty",

  // for debug
  [poiStatusValue.unknown]: "poi.data.status.unknown.value.unknown",
};

export const poiStatusValueSelect = {
  [poiStatusType.maintenance]: [
    poiStatusValue.empty,
    poiStatusValue.maintenanceCompleted,
    poiStatusValue.underMaintenance,
  ],
  [poiStatusType.function]: [
    poiStatusValue.empty,
    poiStatusValue.functional,
    poiStatusValue.remainsFuntional,
    poiStatusValue.nonFunctional,
  ],
  [poiStatusType.appearance]: [
    poiStatusValue.empty,
    poiStatusValue.appearanceGood,
    poiStatusValue.appearanceBad,
  ],
  [poiStatusType.occupation]: [
    poiStatusValue.empty,
    poiStatusValue.occupied,
    poiStatusValue.unoccupied,
  ],
  [poiStatusType.usage]: [
    poiStatusValue.empty,
    poiStatusValue.spacesAvailable,
    poiStatusValue.limitedSpaces,
    poiStatusValue.noSpaces,
  ],
  [poiStatusType.crowd]: [
    poiStatusValue.empty,
    poiStatusValue.crowded,
    poiStatusValue.normalCrowded,
    poiStatusValue.notCrowded,
  ],
  [poiStatusType.noise]: [
    poiStatusValue.empty,
    poiStatusValue.quiet,
    poiStatusValue.normalNoiseLevel,
    poiStatusValue.noisy,
  ],
  [poiStatusType.thermalComfort]: [
    poiStatusValue.empty,
    poiStatusValue.comfortable,
    poiStatusValue.normalComfort,
    poiStatusValue.uncomfortable,
  ],
  [poiStatusType.cleanliness]: [
    poiStatusValue.empty,
    poiStatusValue.goodCleanliness,
    poiStatusValue.normalCleanliness,
    poiStatusValue.badCleanliness,
  ],
  [poiStatusType.unknown]: [poiStatusValue.unknown],
};
