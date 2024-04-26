import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { getLocationCategories } from "../../../../constants/facility";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCategories } from "../../../../store/facility";
import { IRootState } from "../../../../store";
import facilityMarkerFilter from "../../../../assets/images/facilityMarkerFilter.svg";
import { openModal } from "../../../../store/modal";
import FacilityFilter from "../../../modal/FacilityFilter";

const FacilityFilterFabs: React.FC = () => {
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const categories = cluster ? getLocationCategories(cluster.data.name) : [];

  const selectedCategories = useSelector(
    (state: IRootState) => state.facility.selectedCategories,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize selected categories to empty array
    if (cluster) {
      dispatch(setSelectedCategories([]));
    }
  }, [cluster, dispatch]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      // If the category is already selected, remove it
      dispatch(
        setSelectedCategories(
          selectedCategories.filter((cat) => cat !== category),
        ),
      );
    } else {
      // If the category is not selected, add it
      dispatch(setSelectedCategories([...selectedCategories, category]));
    }
  };

  const handleFilterClick = () => {
    dispatch(openModal("facilityFilter"));
  };

  return clusterId ? (
    <>
      <div className="absolute inset-0 w-3/4 h-9 top-8 left-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 items-center justify-left">
          {categories.map((category, index) => (
            <Button
              key={category + index}
              className={`shrink-0 \
                      bg-zinc-50 dark:bg-zinc-800 \
                        text-black dark:text-white \
                        border border-zinc-400 dark:border-zinc-900 \
                        shadow-sm shadow-zinc-300 dark:shadow-zinc-800 
                        ${
                          selectedCategories.includes(category)
                            ? "bg-textBtnHover dark:bg-textBtnHover text-white dark:text-white"
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
      </div>
      <Button
        key="FacilityFilterFab"
        className="absolute top-20 right-4 w-10 h-10"
        isIconOnly
        size="sm"
        style={{ backgroundColor: "transparent", padding: 0 }}
        onClick={() => {
          handleFilterClick();
        }}
      >
        <img src={facilityMarkerFilter} alt="facilityMarkerFilter" />
      </Button>
      <FacilityFilter />
    </>
  ) : null;
};

export default FacilityFilterFabs;
