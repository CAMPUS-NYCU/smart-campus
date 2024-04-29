import { Button } from "@nextui-org/react";
import { addReport } from "../../../../store/report";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { openModal } from "../../../../store/modal";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../../../../api/user";
import { useSearchParams } from "react-router-dom";
import addReportBtn from "../../../../assets/images/addReport.svg";

const AddReportFab: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { data: user } = useGetUserQuery();

  const id = getParamsFromDrawer("cluster", searchParams).clusterId;

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
      key="AddReportFab"
      className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-14 h-14"
      isIconOnly
      size="sm"
      style={{ backgroundColor: "transparent", padding: 0 }}
      onClick={() => {
        handleAddReportClick();
      }}
    >
      <img src={addReportBtn} alt="add report button" />
    </Button>
  );
};

export default AddReportFab;
