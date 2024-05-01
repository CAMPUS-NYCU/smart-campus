import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetUserQuery } from "../../../../api/user";
import { openModal } from "../../../../store/modal";
import { addReport } from "../../../../store/report";
import addReportBtn from "../../../../assets/images/addReport.svg";

const AddReportFab: React.FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const id = getParamsFromDrawer("cluster", searchParams).clusterId;

  const { data: user } = useGetUserQuery();

  const handleAddReportClick = () => {
    if (!id) {
      throw new Error("ClusterDrawer: id is null");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(addReport({ clusterId: id, createdBy: user?.id }));
    }
  };

  return (
    <Button
      aria-label="AddReportFab"
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      isIconOnly
      size="lg"
      onClick={() => {
        handleAddReportClick();
      }}
    >
      <img src={addReportBtn} alt="Add Report Button" />
    </Button>
  );
};

export default AddReportFab;
