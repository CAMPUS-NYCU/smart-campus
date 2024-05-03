import { Button, Skeleton } from "@nextui-org/react";
import { IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../store/modal";
import { setRecommandContributions } from "../../../store/llm";
import Drawer from "../../Drawer";
import {
  getParamsFromDrawer,
  setupDrawerParams,
} from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../api/user";
import { addReport } from "../../../store/report";
import { useEffect } from "react";

const LlmResult: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: user } = useGetUserQuery();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmResult"],
  );

  const recommandContributions = useSelector(
    (state: IRootState) => state.llm.recommandContributions,
  );

  // useGetPoisQuery(where id === recommandContributions)

  useEffect(() => {
    console.log("LLM Results Page", recommandContributions);
  }, [recommandContributions]);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setRecommandContributions([]));
    setupDrawerParams<"cluster">({ clusterId }, searchParams, setSearchParams);
    dispatch(closeModal("llmResult"));
  };

  const handlePoiEdit = () => {
    if (!clusterId) {
      throw new Error("ClusterDrawer: id is null");
    } else if (!user?.id) {
      dispatch(openModal("login"));
    } else {
      dispatch(addReport({ clusterId: clusterId, createdBy: user?.id }));
      dispatch(closeModal("llmResult"));
    }
  };

  return (
    <Drawer
      open={modalOpen}
      onClose={handleCloseModal}
      title={"haha"}
      children={
        <div>
          {recommandContributions.length > 0 ? (
            recommandContributions.map((contribution, index) => (
              <div key={index}>{contribution}</div>
            ))
          ) : (
            <Skeleton className="w-full h-[30vh] rounded-md" />
          )}
        </div>
      }
      primaryButton={
        <Button
          radius="full"
          className="bg-primary h-fit px-2 py-1.5"
          onClick={handlePoiEdit}
        >
          新增回報
        </Button>
      }
    />
  );
};

export default LlmResult;
