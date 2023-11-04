import {
  FirestoreResourceGroup,
  FirestoreResourceGroupData,
} from "../../../../models/firebase/firestore";
import ResourceGroup, {
  ResourceGroupData,
} from "../../../../models/resourceGroup";

export const toFirebaseResourceGroupByResourceGroup = (
  resourceGroup: ResourceGroup,
): FirestoreResourceGroup => ({
  id: resourceGroup.id,
  data: toFirebaseResourceGroupDataByResourceGroupData(resourceGroup.data),
});

export const toFirebaseResourceGroupDataByResourceGroupData = (
  resourceGroup: ResourceGroupData,
): FirestoreResourceGroupData => ({
  name: resourceGroup.name,
});

export const toResourceGroupByFirebaseResourceGroup = (
  resourceGroup: FirestoreResourceGroup,
): ResourceGroup => ({
  id: resourceGroup.id,
  data: toResourceGroupDataByFirebaseResourceGroupData(resourceGroup.data),
});

export const toResourceGroupDataByFirebaseResourceGroupData = (
  resourceGroup: FirestoreResourceGroupData,
): ResourceGroupData => ({
  name: resourceGroup.name,
});
