import {
  FirestoreResource,
  FirestoreResourceData,
} from "../../../../models/firebase/firestore";
import Resource, { ResourceData } from "../../../../models/resource";

export const toFirebaseResourceByResource = (
  resource: Resource,
): FirestoreResource => ({
  id: resource.id,
  data: toFirebaseResourceDataByResourceData(resource.data),
});

export const toFirebaseResourceDataByResourceData = (
  resource: ResourceData,
): FirestoreResourceData => ({
  name: resource.name,
  groupId: resource.groupId,
});

export const toResourceByFirebaseResource = (
  resource: FirestoreResource,
): Resource => ({
  id: resource.id,
  data: toResourceDataByFirebaseResourceData(resource.data),
});

export const toResourceDataByFirebaseResourceData = (
  resource: FirestoreResourceData,
): ResourceData => ({
  name: resource.name,
  groupId: resource.groupId,
});
