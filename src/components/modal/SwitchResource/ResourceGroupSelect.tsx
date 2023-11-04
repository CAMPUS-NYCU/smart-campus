import React from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "@nextui-org/react";

import { useGetResourceGroupsQuery } from "../../../api/resource";

interface ResourceGroupSelectProps {
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
}

const ResourceGroupSelect: React.FC<ResourceGroupSelectProps> = ({
  selectedKey,
  onSelect,
}) => {
  const { t } = useTranslation();

  const { data: resourceGroups, isFetching: fetchingResourceGroups } =
    useGetResourceGroupsQuery();

  const selectedKeys = (() => {
    if (fetchingResourceGroups) {
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
      label={t("switchResource.select.setResourceGroup.label", {
        ns: ["modal"],
      })}
      placeholder={t("switchResource.select.setResourceGroup.placeholder", {
        ns: ["modal"],
      })}
      selectedKeys={selectedKeys}
      isLoading={fetchingResourceGroups}
      onChange={handleSelectChange}
    >
      {(resourceGroups ? Object.entries(resourceGroups) : []).map(
        ([id, { name }]) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ),
      )}
    </Select>
  );
};

export default ResourceGroupSelect;
