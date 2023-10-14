import translationENUSDrawer from "./en-us/drawer.json";
import translationENUSMap from "./en-us/map.json";
import translationENUSModal from "./en-us/modal.json";
import translationENUSModel from "./en-us/model.json";

import translationZHCNDrawer from "./zh-cn/drawer.json";
import translationZHCNMap from "./zh-cn/map.json";
import translationZHCNModal from "./zh-cn/modal.json";
import translationZHCNModel from "./zh-cn/model.json";

import translationZHTWDrawer from "./zh-tw/drawer.json";
import translationZHTWMap from "./zh-tw/map.json";
import translationZHTWModal from "./zh-tw/modal.json";
import translationZHTWModel from "./zh-tw/model.json";

export const languageConfigs = {
  "en-US": {
    name: "English",
    resources: {
      drawer: translationENUSDrawer,
      map: translationENUSMap,
      modal: translationENUSModal,
      model: translationENUSModel,
    },
  },
  "zh-CN": {
    name: "简体中文",
    resources: {
      drawer: translationZHCNDrawer,
      map: translationZHCNMap,
      modal: translationZHCNModal,
      model: translationZHCNModel,
    },
  },
  "zh-TW": {
    name: "繁體中文",
    resources: {
      drawer: translationZHTWDrawer,
      map: translationZHTWMap,
      modal: translationZHTWModal,
      model: translationZHTWModel,
    },
  },
};
