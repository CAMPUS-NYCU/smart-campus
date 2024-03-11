export const poiStatusType = {
  // 物體的回報狀態
  maintenance: "maintenance",
  function: "function",
  appearance: "appearance",
  occupation: "occupation",
  presence: "presence",
  availability: "availability",
  experience: "experience",
  reservation: "reservation",

  // 空間的回報狀態
  space: "space",
  crowd: "crowd",
  noise: "noise",
  temperature: "temperature",
  humidity: "humidity",
  ventilation: "ventilation",
  lighting: "lighting",
  odor: "odor",

  // 物體空間共用
  cleanliness: "cleanliness",
};

export const poiStatusTypeMessageKeys = {
  // 物體的回報狀態
  [poiStatusType.maintenance]: "poi.data.status.maintenance.name",
  [poiStatusType.function]: "poi.data.status.function.name",
  [poiStatusType.appearance]: "poi.data.status.appearance.name",
  [poiStatusType.occupation]: "poi.data.status.occupation.name",
  [poiStatusType.presence]: "poi.data.status.presence.name",
  [poiStatusType.availability]: "poi.data.status.availability.name",
  [poiStatusType.experience]: "poi.data.status.experience.name",
  [poiStatusType.reservation]: "poi.data.status.reservation.name",

  // 空間的回報狀態
  [poiStatusType.space]: "poi.data.status.space.name",
  [poiStatusType.crowd]: "poi.data.status.crowd.name",
  [poiStatusType.noise]: "poi.data.status.noise.name",
  [poiStatusType.temperature]: "poi.data.status.temperature.name",
  [poiStatusType.humidity]: "poi.data.status.humidity.name",
  [poiStatusType.ventilation]: "poi.data.status.ventilation.name",
  [poiStatusType.lighting]: "poi.data.status.lighting.name",
  [poiStatusType.odor]: "poi.data.status.odor.name",

  // 物體空間共用
  [poiStatusType.cleanliness]: "poi.data.status.cleanliness.name",
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
  // 存在狀態 presence
  present: "present", // 存在
  absent: "absent", // 不存在
  // 可用性 availability
  available: "available", // 可使用
  nonAvailable: "nonAvailable", // 尚無法使用
  // 體驗狀態 experience
  goodExperience: "goodExperience", // 體驗佳
  normalExperience: "normalExperience", // 體驗尚可
  poorExperience: "poorExperience", // 體驗差
  // 預約狀態 reservation
  reserved: "reserved", // 預約中
  unreserved: "unreserved", // 未預約

  // 空間的回報狀態描述
  // 空位狀態 space
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
  // 溫度狀態 temperature
  hot: "hot", // 熱
  comfortTemperature: "comfortTemperature", // 舒適
  cold: "cold", // 冷
  // 濕度狀態 humidity
  humid: "humid", // 潮濕
  comfortableHumidity: "comfortableHumidity", // 舒適
  dry: "dry", // 乾燥
  // 通風狀態 ventilation
  goodVentilation: "goodVentilation", // 通風順暢
  badVentilation: "badVentilation", // 通風不良
  // 光線狀態 lighting
  glaring: "glaring", // 光線刺眼
  adequate: "adequate", // 光線充足
  dim: "dim", // 光線昏暗
  // 氣味狀態 odor
  odorous: "odorous", // 有異味
  odorless: "odorless", // 無異味

  // 物體空間共用狀態描述
  // 清潔狀態 cleanliness
  goodCleanliness: "goodCleanliness", // 整潔
  normalCleanliness: "normalCleanliness", // 普通
  badCleanliness: "badCleanliness", // 髒亂
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
  // 存在狀態
  [poiStatusValue.present]: "poi.data.status.presence.value.present",
  [poiStatusValue.absent]: "poi.data.status.presence.value.absent",
  // 可用性
  [poiStatusValue.available]: "poi.data.status.availability.value.available",
  [poiStatusValue.nonAvailable]:
    "poi.data.status.availability.value.nonAvailable",
  // 體驗狀態
  [poiStatusValue.goodExperience]: "poi.data.status.experience.value.good",
  [poiStatusValue.normalExperience]: "poi.data.status.experience.value.normal",
  [poiStatusValue.poorExperience]: "poi.data.status.experience.value.poor",
  // 預約狀態
  [poiStatusValue.reserved]: "poi.data.status.reservation.value.reserved",
  [poiStatusValue.unreserved]: "poi.data.status.reservation.value.unreserved",

  // 空間的回報狀態描述
  // 使用狀態
  [poiStatusValue.spacesAvailable]: "poi.data.status.space.value.available",
  [poiStatusValue.limitedSpaces]: "poi.data.status.space.value.limited",
  [poiStatusValue.noSpaces]: "poi.data.status.space.value.noSpaces",
  // 人潮狀態
  [poiStatusValue.crowded]: "poi.data.status.crowd.value.dense",
  [poiStatusValue.normalCrowded]: "poi.data.status.crowd.value.normal",
  [poiStatusValue.notCrowded]: "poi.data.status.crowd.value.sparse",
  // 噪音狀態
  [poiStatusValue.quiet]: "poi.data.status.noise.value.quiet",
  [poiStatusValue.normalNoiseLevel]: "poi.data.status.noise.value.normal",
  [poiStatusValue.noisy]: "poi.data.status.noise.value.noisy",
  // 溫度狀態
  [poiStatusValue.hot]: "poi.data.status.temperature.value.hot",
  [poiStatusValue.comfortTemperature]:
    "poi.data.status.temperature.value.comfort",
  [poiStatusValue.cold]: "poi.data.status.temperature.value.cold",
  // 濕度狀態
  [poiStatusValue.humid]: "poi.data.status.humidity.value.humid",
  [poiStatusValue.comfortableHumidity]:
    "poi.data.status.humidity.value.comfort",
  [poiStatusValue.dry]: "poi.data.status.humidity.value.dry",
  // 通風狀態
  [poiStatusValue.goodVentilation]: "poi.data.status.ventilation.value.good",
  [poiStatusValue.badVentilation]: "poi.data.status.ventilation.value.bad",
  // 光線狀態
  [poiStatusValue.glaring]: "poi.data.status.lighting.value.glaring",
  [poiStatusValue.adequate]: "poi.data.status.lighting.value.adequate",
  [poiStatusValue.dim]: "poi.data.status.lighting.value.dim",
  // 氣味狀態
  [poiStatusValue.odorous]: "poi.data.status.odor.value.odorous",
  [poiStatusValue.odorless]: "poi.data.status.odor.value.odorless",

  // 物體空間共用狀態描述
  // 清潔狀態
  [poiStatusValue.goodCleanliness]: "poi.data.status.cleanliness.value.good",
  [poiStatusValue.normalCleanliness]:
    "poi.data.status.cleanliness.value.normal",
  [poiStatusValue.badCleanliness]: "poi.data.status.cleanliness.value.bad",
};

export const poiStatusValueSelect = {
  [""]: [""],
  [poiStatusType.maintenance]: [
    "",
    poiStatusValue.maintenanceCompleted,
    poiStatusValue.underMaintenance,
  ],
  [poiStatusType.function]: [
    "",
    poiStatusValue.functional,
    poiStatusValue.remainsFuntional,
    poiStatusValue.nonFunctional,
  ],
  [poiStatusType.appearance]: [
    "",
    poiStatusValue.appearanceGood,
    poiStatusValue.appearanceBad,
  ],
  [poiStatusType.occupation]: [
    "",
    poiStatusValue.occupied,
    poiStatusValue.unoccupied,
  ],
  [poiStatusType.presence]: ["", poiStatusValue.present, poiStatusValue.absent],
  [poiStatusType.availability]: [
    "",
    poiStatusValue.available,
    poiStatusValue.nonAvailable,
  ],
  [poiStatusType.experience]: [
    "",
    poiStatusValue.goodExperience,
    poiStatusValue.normalExperience,
    poiStatusValue.poorExperience,
  ],
  [poiStatusType.reservation]: [
    "",
    poiStatusValue.reserved,
    poiStatusValue.unreserved,
  ],
  [poiStatusType.space]: [
    "",
    poiStatusValue.spacesAvailable,
    poiStatusValue.limitedSpaces,
    poiStatusValue.noSpaces,
  ],
  [poiStatusType.crowd]: [
    "",
    poiStatusValue.crowded,
    poiStatusValue.normalCrowded,
    poiStatusValue.notCrowded,
  ],
  [poiStatusType.noise]: [
    "",
    poiStatusValue.quiet,
    poiStatusValue.normalNoiseLevel,
    poiStatusValue.noisy,
  ],
  [poiStatusType.temperature]: [
    "",
    poiStatusValue.hot,
    poiStatusValue.comfortTemperature,
    poiStatusValue.cold,
  ],
  [poiStatusType.humidity]: [
    "",
    poiStatusValue.humid,
    poiStatusValue.comfortableHumidity,
    poiStatusValue.dry,
  ],
  [poiStatusType.ventilation]: [
    "",
    poiStatusValue.goodVentilation,
    poiStatusValue.badVentilation,
  ],
  [poiStatusType.lighting]: [
    "",
    poiStatusValue.glaring,
    poiStatusValue.adequate,
    poiStatusValue.dim,
  ],
  [poiStatusType.odor]: ["", poiStatusValue.odorous, poiStatusValue.odorless],
  [poiStatusType.cleanliness]: [
    "",
    poiStatusValue.goodCleanliness,
    poiStatusValue.normalCleanliness,
    poiStatusValue.badCleanliness,
  ],
};

export const poiObjectStatusTypeSelect = [
  "",
  poiStatusType.maintenance,
  poiStatusType.function,
  poiStatusType.appearance,
  poiStatusType.occupation,
  poiStatusType.presence,
  poiStatusType.availability,
  poiStatusType.experience,
  poiStatusType.reservation,
  poiStatusType.cleanliness,
];

export const poiSpaceStatusTypeSelect = [
  "",
  poiStatusType.space,
  poiStatusType.crowd,
  poiStatusType.noise,
  poiStatusType.temperature,
  poiStatusType.humidity,
  poiStatusType.ventilation,
  poiStatusType.lighting,
  poiStatusType.odor,
  poiStatusType.cleanliness,
];
