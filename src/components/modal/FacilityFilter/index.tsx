import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

import { getParamsFromDrawer } from "../../../utils/routes/params";
import { getLocationCategories } from "../../../constants/facility";
import { IRootState } from "../../../store";
import { setSelectedCategories } from "../../../store/facility";
import { toggleModal } from "../../../store/modal";
import { useGetClusterQuery } from "../../../api/cluster";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const FacilityFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const categories = cluster ? getLocationCategories(cluster.data.name) : [];
  const selectedCategories = useSelector(
    (state: IRootState) => state.facility.selectedCategories,
  );

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["facilityFilter"],
  );

  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal("facilityFilter"));
  };

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

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">實體物件篩選</ModalHeader>
        <ModalBody className="items-center">
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FacilityFilter;
