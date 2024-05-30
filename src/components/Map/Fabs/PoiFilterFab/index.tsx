import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Selection } from "@react-types/shared";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { getPoiFilterOptions } from "../../../../constants/poiFilterOptions";
import { poiStatusTypeMessageKeys } from "../../../../constants/model/poi";
import {
  setFilterPoiFloors,
  setFilterPoiTargetNames,
  setFilterPoiStatuses,
} from "../../../../store/filter";
import { IRootState } from "../../../../store";

const PoiFilterFabs: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;

  const reportType = useSelector((state: IRootState) => state.report.type);
  const isRecommended =
    !reportType && isCurrentDrawerParams("recommend", searchParams);

  const { data: cluster } = useGetClusterQuery(clusterId);

  const dispatch = useDispatch();

  const floorOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).floor
    : [];
  const targetNameOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).targetName
    : [];
  const statusOptions = cluster
    ? getPoiFilterOptions(cluster.data.name).status
    : [];

  const [floor, setFloor] = React.useState<Set<string>>(new Set([]));
  const [targetName, setTargetName] = React.useState<Set<string>>(new Set([]));
  const [status, setStatus] = React.useState<Set<string>>(new Set([]));

  const handleFloorChange = (selection: Selection) => {
    let selectedItems = new Set<string>();
    if (selection && typeof selection === "object") {
      selectedItems = new Set(Array.from(selection as Set<string>));
    } else if (typeof selection === "string") {
      selectedItems = new Set([selection]);
    }

    setFloor(selectedItems);
    dispatch(setFilterPoiFloors(Array.from(selectedItems)));
  };
  const handleTargetNameChange = (selection: Selection) => {
    let selectedItems = new Set<string>();
    if (selection && typeof selection === "object") {
      selectedItems = new Set(Array.from(selection as Set<string>));
    } else if (typeof selection === "string") {
      selectedItems = new Set([selection]);
    }

    setTargetName(selectedItems);
    dispatch(setFilterPoiTargetNames(Array.from(selectedItems)));
  };
  const handleStatausChange = (selection: Selection) => {
    let selectedItems = new Set<string>();
    if (selection && typeof selection === "object") {
      selectedItems = new Set(Array.from(selection as Set<string>));
    } else if (typeof selection === "string") {
      selectedItems = new Set([selection]);
    }

    setStatus(selectedItems);
    dispatch(setFilterPoiStatuses(Array.from(selectedItems)));
  };

  React.useEffect(() => {
    return () => {
      setFloor(new Set([]));
      setTargetName(new Set([]));
      setStatus(new Set([]));
      console.log("clean up filter poi");
    };
  }, [cluster, isRecommended]);

  return (
    <div className="absolute inset-0 w-3/4 h-9 top-8 left-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 items-center justify-left">
        {cluster && (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className={`shrink-0 \
                    bg-zinc-50 dark:bg-zinc-800 \
                      text-black dark:text-white \
                      border border-zinc-400 dark:border-zinc-900 \
                      shadow-sm shadow-zinc-300 dark:shadow-zinc-800 py-0 h-8 min-h-fit
                      ${
                        floor.size > 0
                          ? "bg-primary dark:bg-textBtnHover dark:text-white"
                          : ""
                      }
                      `}
                >
                  樓層
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Floor filter actions"
                closeOnSelect={false}
                selectionMode="multiple"
                disallowEmptySelection={false}
                selectedKeys={floor}
                onSelectionChange={handleFloorChange}
                classNames={{
                  list: "max-h-60 overflow-y-auto",
                }}
              >
                {floorOptions.map((fOption) => (
                  <DropdownItem key={fOption}>{fOption}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className={`shrink-0 \
                    bg-zinc-50 dark:bg-zinc-800 \
                      text-black dark:text-white \
                      border border-zinc-400 dark:border-zinc-900 \
                      shadow-sm shadow-zinc-300 dark:shadow-zinc-800 py-0 h-8 min-h-fit
                      ${
                        targetName.size > 0
                          ? "bg-primary dark:bg-textBtnHover dark:text-white"
                          : ""
                      }
                      `}
                >
                  回報項目
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="TargetName filter actions"
                closeOnSelect={false}
                selectionMode="multiple"
                disallowEmptySelection={false}
                selectedKeys={targetName}
                onSelectionChange={handleTargetNameChange}
                classNames={{
                  list: "max-h-60 overflow-y-auto",
                }}
              >
                {targetNameOptions.map((tOption) => (
                  <DropdownItem key={tOption}>{tOption}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className={`shrink-0 \
                    bg-zinc-50 dark:bg-zinc-800 \
                      text-black dark:text-white \
                      border border-zinc-400 dark:border-zinc-900 \
                      shadow-sm shadow-zinc-300 dark:shadow-zinc-800 py-0 h-8 min-h-fit
                      ${
                        status.size > 0
                          ? "bg-primary dark:bg-textBtnHover dark:text-white"
                          : ""
                      }
                      `}
                >
                  回報狀態
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status filter actions"
                closeOnSelect={false}
                selectionMode="multiple"
                disallowEmptySelection={false}
                selectedKeys={status}
                onSelectionChange={handleStatausChange}
                classNames={{
                  list: "max-h-60 overflow-y-auto",
                }}
              >
                {statusOptions.map((sOption) => (
                  <DropdownItem key={sOption}>
                    {t(poiStatusTypeMessageKeys[sOption], {
                      ns: ["model"],
                    })}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default PoiFilterFabs;
