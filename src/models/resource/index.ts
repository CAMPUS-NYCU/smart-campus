interface Resource {
  id: string;
  data: ResourceData;
}

export interface ResourceData {
  name: string;
  groupId: string;
}

export type Resources = Record<string, ResourceData>;

export type ResourceOrNull = Resource | null;

export default Resource;
