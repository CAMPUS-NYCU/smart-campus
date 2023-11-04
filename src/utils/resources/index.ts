import { localStorageKeys } from "../../constants/browser";

export const getResourceId = () => {
  return localStorage.getItem(localStorageKeys.resourceId);
};

export const getResourceGroupId = () => {
  return localStorage.getItem(localStorageKeys.resourceGroupId);
};

export const setResourceId = (resource: string | null) => {
  if (resource) {
    localStorage.setItem(localStorageKeys.resourceId, resource);
  } else {
    localStorage.removeItem(localStorageKeys.resourceId);
  }
};

export const setResourceGroupId = (resourceGroup: string | null) => {
  if (resourceGroup) {
    localStorage.setItem(localStorageKeys.resourceGroupId, resourceGroup);
  } else {
    localStorage.removeItem(localStorageKeys.resourceGroupId);
  }
};
