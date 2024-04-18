import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../../utils/routes/params";
import { useGetClusterQuery } from "../../../../api/cluster";
import { openModal } from "../../../../store/modal";
import InputLlm from "../../../modal/InputLlm";

const LlmFabs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;
  const { data: cluster } = useGetClusterQuery(clusterId);

  const handleOpenInputLlmModal = () => {
    dispatch(openModal("inputLlm"));
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
      <InputLlm />
    </>
  ) : null;
};

export default LlmFabs;
