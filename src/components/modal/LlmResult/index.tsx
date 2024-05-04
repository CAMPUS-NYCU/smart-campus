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
import { useCallback, useEffect, useState } from "react";
import { useLazyGetPoiQuery } from "../../../api/poi";
import Poi from "../../../models/poi";

const LlmResult: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: user } = useGetUserQuery();
  const [getPoi] = useLazyGetPoiQuery();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmResult"],
  );

  const recommandContributions = useSelector(
    (state: IRootState) => state.llm.recommandContributions,
  );

  const [recommandPois, setRecommandPois] = useState<Poi[]>([]);

  const fetchData = useCallback(
    async (recommandContributions: string[]) => {
      const tasks = recommandContributions.map((contribution) => {
        return getPoi(contribution)
          .unwrap()
          .then((res) => {
            if (res === null) throw new Error("No recommand poi found.");
            else {
              return res;
            }
          });
      });
      const res = await Promise.all(tasks);
      return res;
    },
    [getPoi],
  );

  useEffect(() => {
    fetchData(recommandContributions).then((res) => {
      setRecommandPois(res);
    });
  }, [fetchData, recommandContributions]);

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
  console.log("Result infos", recommandPois);

  return (
    <Drawer
      open={modalOpen}
      onClose={handleCloseModal}
      title={"haha"}
      children={
        <div>
          {/* {recommandContributions.length > 0 ? (
            recommandContributions.map((contribution, index) => (
              <div key={index}>{contribution}</div>
            ))
          ) : (
            <Skeleton className="w-full h-[30vh] rounded-md" />
          )} */}
          {recommandPois.length > 0 ? (
            recommandPois.map((poi, index) => (
              <div key={index}>{poi.data.clusterId}</div>
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
