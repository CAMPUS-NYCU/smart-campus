import { SetURLSearchParams } from "react-router-dom";

const drawerParamKeysMap = {
  cluster: ["clusterId"],
  poi: ["poiId"],
} as const;

type DrawerParamKeysMap = {
  [K in keyof typeof drawerParamKeysMap]: (typeof drawerParamKeysMap)[K][number];
};

type DrawerType = keyof DrawerParamKeysMap;
type ParamKeys = DrawerParamKeysMap[keyof DrawerParamKeysMap];

type DrawerParamKeys<T extends DrawerType> = T extends keyof DrawerParamKeysMap
  ? DrawerParamKeysMap[T]
  : never;

type DrawerParams<T extends DrawerType> = Record<DrawerParamKeys<T>, string>;

export const isCurrentDrawerParams = (
  type: DrawerType,
  searchParams: URLSearchParams,
) => searchParams.has(drawerParamKeysMap[type][0]);

export const getParamsFromDrawer = (
  type: DrawerType,
  searchParams: URLSearchParams,
) => {
  const entries = drawerParamKeysMap[type].map((key) => ({
    key,
    value: searchParams.get(key) as string,
  }));

  return entries.reduce(
    (acc, { key, value }) => ({ ...acc, [key]: value }),
    {} as Record<ParamKeys, string>,
  );
};

const getInitDrawerParams = (searchParams: URLSearchParams) => {
  Object.values(drawerParamKeysMap).forEach((keys) =>
    keys.forEach((key) => searchParams.delete(key)),
  );
  return searchParams;
};

export const resetDrawerParams = (
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) => {
  const initDrawerParams = getInitDrawerParams(searchParams);
  setSearchParams(initDrawerParams);
};

export const getSetupDrawerParams = <T extends DrawerType>(
  paramsToUpdate: DrawerParams<T>,
  searchParams: URLSearchParams,
) => {
  const updatedSearchParams = getInitDrawerParams(searchParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    updatedSearchParams.set(key, value as string);
  });
  return updatedSearchParams;
};

export const setupDrawerParams = <T extends DrawerType>(
  paramsToUpdate: DrawerParams<T>,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) => {
  const updatedSearchParams = getSetupDrawerParams(
    paramsToUpdate,
    searchParams,
  );
  setSearchParams(updatedSearchParams);
};
