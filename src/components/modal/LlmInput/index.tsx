import React from "react";
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
  find_closest_facility_multi_location,
} from "../../../api/gpt";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { useLazyGetPoisQuery } from "../../../api/poi";
import { convertToContributionData } from "../../../constants/gpt";
import { setRecommandContributions } from "../../../store/llm";
import { getResourceGroupId } from "../../../utils/resources";

const LlmInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmInput"],
  );

  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const reportType = useSelector((state: IRootState) => state.report.type);

  const selected =
    !reportType && isCurrentDrawerParams("cluster", searchParams);
  const id = selected
    ? getParamsFromDrawer("cluster", searchParams).clusterId
    : null;

  const [getPois] = useLazyGetPoisQuery();

  async function gptFunction() {
    if (id) {
      await Promise.all([
        def_place_and_object(description),
        getPois(id).unwrap(),
      ])
        .then((resAll) => {
          let targetMarker = "";
          let itemAddress: number[] = [];
          if (resAll[0]) {
            const {
              樓層: floor,
              參照點: locationName,
              物體: item,
              物體狀態: status,
            } = JSON.parse(resAll[0]);
            const resourceGroupId = getResourceGroupId();

            if (locationName.length > 1) {
              const {
                closestItemName: tmpTargetMarker,
                itemAddress: tmpItemAddress,
              } = find_closest_facility_multi_location(
                resourceGroupId ? resourceGroupId : "",
                floor,
                locationName[0],
                locationName[1],
                item,
              );

              targetMarker = tmpTargetMarker;
              itemAddress = tmpItemAddress;
            } else {
              const {
                closestItemName: tmpTargetMarker,
                itemAddress: tmpItemAddress,
              } = find_closest_facility(
                resourceGroupId ? resourceGroupId : "",
                floor,
                locationName[0],
                item,
              );

              targetMarker = tmpTargetMarker;
              itemAddress = tmpItemAddress;
            }

            const inputContributions = convertToContributionData(resAll[1]);
            return def_contribution(
              inputContributions,
              targetMarker,
              itemAddress,
              status,
            );
          } else {
            throw new Error("LLM1 Error");
          }
        })
        .then((res) => {
          const recommandContributionArray: string[] = Object.values(
            JSON.parse(res),
          );
          dispatch(setRecommandContributions(recommandContributionArray));
        });
    } else {
      console.error("No id found");
    }
  }

  const handleCommit = () => {
    gptFunction();

    setDescription("");
    dispatch(closeModal("llmInput"));
    dispatch(openModal("llmResult"));
    // setupDrawerSlug<"cluster">(
    //   { clusterId: id ? id : "" },
    //   searchParams,
    //   setSearchParams,
    //   navigate,
    // );
    setSearchParams({ clusterId: id ?? "", recommend: "true" });
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
