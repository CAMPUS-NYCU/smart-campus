import React from "react";
import { Button } from "@nextui-org/react";

const AddReportFab: React.FC = () => {
  return (
    <>
      <Button
        aria-label="Add report"
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        size="lg"
      >
        ADD REPORT
      </Button>
    </>
  );
};

export default AddReportFab;
