interface ResourceGroup {
  id: string;
  data: ResourceGroupData;
}

export interface ResourceGroupData {
  name: string;
}

export type ResourceGroups = Record<string, ResourceGroupData>;

export type ResourceGroupOrNull = ResourceGroup | null;

export default ResourceGroup;
