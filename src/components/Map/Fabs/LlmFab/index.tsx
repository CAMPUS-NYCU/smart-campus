import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { openModal } from "../../../../store/modal";
import LlmInput from "../../../modal/LlmInput";

const LlmFabs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const handleOpenInputLlmModal = () => {
    dispatch(openModal("llmInput"));
  };

  return cluster ? (
    <>
      <Button
        key="LLM Fabs"
        className="absolute top-40 right-4 w-10 h-10"
        color="primary"
        size="sm"
        onClick={() => handleOpenInputLlmModal()}
      />
      <LlmInput />
    </>
  ) : null;
};

export default LlmFabs;
