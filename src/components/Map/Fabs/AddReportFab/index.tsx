import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";

import { useGetUserQuery } from "../../../../api/user";
import { openModal } from "../../../../store/modal";
import { addReport } from "../../../../store/report";
import addReportBtn from "../../../../assets/images/addReport.svg";

const AddReportFab: React.FC = () => {
  const dispatch = useDispatch();

  const { data: user } = useGetUserQuery();

  const handleAddReportClick = () => {
    if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(addReport({ createdBy: user?.id }));
    }
  };

  return (
    <Button
      aria-label="AddReportFab"
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      isIconOnly
      size="lg"
      style={{ backgroundColor: "transparent", padding: 0 }}
      onClick={() => {
        handleAddReportClick();
      }}
    >
      <img src={addReportBtn} alt="Add Report Button" />
    </Button>
  );
};

export default AddReportFab;
