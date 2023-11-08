import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { getLocationCategories } from "../../../../constants/facility";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import FacilityMarker from "../../Markers/FacilityMarkers";

const FacilityFilterFabs: React.FC = () => {
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const allCategories = cluster ? getLocationCategories(cluster.data.name) : [];
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );

  useEffect(() => {
    // Initialize selected categories to empty array
    if (cluster) setSelectedCategories([]);
  }, [cluster]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      // If the category is already selected, remove it
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
    } else {
      // If the category is not selected, add it
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="absolute inset-0 w-3/4 h-9 top-8 left-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 items-center justify-left">
        {allCategories.map((category) => (
          <Button
            key={category}
            className={`shrink-0 \
                    bg-zinc-50 dark:bg-zinc-800 \
                      text-black dark:text-white \
                      border border-zinc-400 dark:border-zinc-900 \
                      shadow-sm shadow-zinc-300 dark:shadow-zinc-800 
                      ${
                        selectedCategories.includes(category)
                          ? "bg-primary dark:bg-primary text-white dark:text-white"
                          : ""
                      }`}
            color="primary"
            size="sm"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <FacilityMarker selectedCategories={selectedCategories} />
    </div>
  );
};

export default FacilityFilterFabs;
