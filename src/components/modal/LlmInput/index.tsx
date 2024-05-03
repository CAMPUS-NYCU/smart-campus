import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "@nextui-org/react";
import { IRootState } from "../../../store";
import { closeModal, openModal, toggleModal } from "../../../store/modal";
import {
  def_place_and_object,
  def_contribution,
  find_closest_facility,
} from "../../../api/gpt";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { useGetPoisQuery } from "../../../api/poi";
import { convertToContributionData } from "../../../constants/gpt";
import { setRecommandContributions } from "../../../store/llm";

const LlmInput: React.FC = () => {
  const [searchParams] = useSearchParams();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmInput"],
  );

  const dispatch = useDispatch();

  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected =
    !reportType && isCurrentDrawerParams("cluster", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const [gptFunctionExecuted, setGptFunctionExecuted] = useState(false);

  const { data: poiList } = useGetPoisQuery(id, {
    skip: !gptFunctionExecuted, // 只有當 gptFunction 已經執行時才執行這個查詢
  });

  //  const [trigger, result, data] = useLazyGetPoisQuery();

  const [targetMarker, setTargetMarker] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  async function gptFunction() {
    setGptFunctionExecuted(true);
    const result = await def_place_and_object(description);
    let locationName: string = "";
    let item: string = "";
    let status: string = "";
    if (result) {
      locationName = result?.split("，")[1];
      item = result?.split("，")[2];
      status = result?.split("，")[3];
      const targetMarker = find_closest_facility(locationName, item);
      console.log(targetMarker, status);

      if (targetMarker) {
        setTargetMarker(targetMarker);
        setStatus(status);
      } else {
        console.error("Target Marker get Error", targetMarker);
        return;
      }
    } else {
      console.error("LLM1 Error", result);
      return;
    }
  }

  // [Bug 1] It will only works once, if user input the same(similiar) input. PoiList & targetMarker & status remains the same and useEffect not triggered
  // And I clear the recommandContributions in LlmResult.tsx, so the Drawer will remain skeleton.
  // [Bug 2] When i hot updated the page, this useEffect will be trigger again.

  useEffect(() => {
    async function fetchData() {
      if (poiList && targetMarker && status) {
        console.log("LLM3 Inputs", poiList, targetMarker, status);
        const inputContributions = convertToContributionData(poiList);
        const recommandContribution = await def_contribution(
          inputContributions,
          targetMarker,
          status,
        );
        console.log("Pure LLM Feedback", recommandContribution);
        if (recommandContribution) {
          const recommandContributionArray: string[] = Object.values(
            JSON.parse(recommandContribution),
          );

          console.log("LLM Results set to Redux", recommandContributionArray);
          dispatch(setRecommandContributions(recommandContributionArray));
        } else {
          console.error("No recommands found.");
        }
      }
    }
    fetchData();
  }, [poiList, targetMarker, status, dispatch]);

  const handleCommit = () => {
    console.log("User Inputs", description);
    gptFunction();

    setDescription("");
    dispatch(closeModal("llmInput"));
    dispatch(openModal("llmResult"));
  };

  const handleCloseModal = () => {
    setDescription("");
    dispatch(closeModal("llmInput"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("llmInput"));
  };

  const [description, setDescription] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">InputLlm</ModalHeader>
        <ModalBody className="items-center">
          <Input
            aria-label="set description"
            placeholder="set description"
            value={description}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            關閉
          </Button>
          <Button color="danger" variant="light" onPress={handleCommit}>
            送出
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LlmInput;
