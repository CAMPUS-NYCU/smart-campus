import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { getLocationCategories } from "../../../../constants/facility";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";

const FacilityFilterFabs: React.FC = () => {
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const [categories, setCategories] = React.useState<string[]>([]);

  useEffect(() => {
    if (cluster) setCategories(getLocationCategories(cluster.data.name));
    else {
      setCategories([]);
    }
  }, [cluster]);

  return (
    <div className="absolute inset-0 w-3/4 h-9 top-8 left-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 items-center justify-left">
        {categories.map((category) => (
          <Button
            key={category}
            className="shrink-0 \
                    bg-zinc-50 dark:bg-zinc-800 \
                      text-black dark:text-white \
                      border border-zinc-400 dark:border-zinc-900 \
                      shadow-sm shadow-zinc-300 dark:shadow-zinc-800"
            color="primary"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FacilityFilterFabs;
