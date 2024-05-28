import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { getPoiFilterOptions } from "../../../../constants/poiFilterOptions";
import { poiStatusTypeMessageKeys } from "../../../../constants/model/poi";

const PoiFilterFabs: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const floorOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).floor
    : [];
  const targetNameOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).targetName
    : [];
  const statusOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).status
    : [];

  return (
    <div className="absolute inset-0 w-3/4 h-9 top-8 left-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-0.5 items-center justify-left">
        {cluster && (
          <>
            <Select
              aria-label="filter floor"
              placeholder="樓層"
              classNames={{
                value: "text-xs",
                innerWrapper: "pt-0",
                trigger: "px-2 py-0 h-7 min-h-fit bg-primary",
                base: "min-w-fit w-7/12 border-0",
                listboxWrapper: "min-w-fit",
              }}
              size="sm"
            >
              {floorOptions.map((floor, index) => (
                <SelectItem
                  key={floor + index}
                  value={floor}
                  textValue="樓層"
                  onClick={() => console.log("click", floor)}
                  classNames={{
                    base: "px-1 gap-0 min-w-fit",
                  }}
                >
                  {floor}
                </SelectItem>
              ))}
            </Select>
            <Select
              aria-label="filter floor"
              placeholder="回報項目"
              classNames={{
                value: "text-xs",
                innerWrapper: "pt-0",
                trigger: "px-2 py-0 h-7 min-h-fit bg-primary",
                base: "min-w-fit border-0",
                listboxWrapper: "min-w-fit",
                // listbox: "rounded-none",
              }}
              size="sm"
            >
              {targetNameOptions.map((targetName, index) => (
                <SelectItem
                  key={targetName + index}
                  value={targetName}
                  textValue="回報項目"
                  onClick={() => console.log("click", targetName)}
                  classNames={{
                    base: "px-1 gap-0 min-w-fit",
                  }}
                >
                  {targetName}
                </SelectItem>
              ))}
            </Select>
            <Select
              aria-label="filter floor"
              placeholder="回報狀態"
              classNames={{
                value: "text-xs",
                innerWrapper: "pt-0",
                trigger: "px-2 py-0 h-7 min-h-fit bg-primary",
                base: "min-w-fit w-3/4 border-0",
                listboxWrapper: "min-w-fit",
              }}
              size="sm"
            >
              {statusOptions.map((status, index) => (
                <SelectItem
                  key={status + index}
                  textValue="回報狀態"
                  value={status}
                  onClick={() =>
                    console.log(
                      "click",
                      status,
                      t(poiStatusTypeMessageKeys[status], {
                        ns: ["model"],
                      }),
                    )
                  }
                  classNames={{
                    base: "px-1 gap-0 min-w-fit",
                  }}
                >
                  {t(poiStatusTypeMessageKeys[status], {
                    ns: ["model"],
                  })}
                </SelectItem>
              ))}
            </Select>
          </>
        )}
      </div>
    </div>
  );
};

export default PoiFilterFabs;
