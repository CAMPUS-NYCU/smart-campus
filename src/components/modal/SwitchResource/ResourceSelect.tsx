import React from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "@nextui-org/react";

import { useGetResourcesQuery } from "../../../api/resource";

interface ResourceSelectProps {
  selectedKey: string | null;
  resourceGroupId: string | null;
  onSelect: (key: string | null) => void;
}

const ResourceSelect: React.FC<ResourceSelectProps> = ({
  selectedKey,
  resourceGroupId,
  onSelect,
}) => {
  const { t } = useTranslation();

  const { data: resources, isFetching: fetchingResources } =
    useGetResourcesQuery(resourceGroupId, {
      skip: !resourceGroupId,
    });

  const selectedKeys = (() => {
    if (fetchingResources) {
      return undefined;
    } else if (!selectedKey) {
      return undefined;
    } else {
      return new Set([selectedKey]);
    }
  })();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      onSelect(e.target.value);
    }
  };

  return (
    <Select
      label={t("switchResource.select.setResource.label", {
        ns: ["modal"],
      })}
      placeholder={t("switchResource.select.setResource.placeholder", {
        ns: ["modal"],
      })}
      selectedKeys={selectedKeys}
      isLoading={fetchingResources}
      onChange={handleSelectChange}
    >
      {(resources ? Object.entries(resources) : []).map(([id, { name }]) => (
        <SelectItem key={id} value={id}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ResourceSelect;
