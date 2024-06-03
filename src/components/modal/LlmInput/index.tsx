import React from "react";
import { useTranslation } from "react-i18next";
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
  find_closest_facility,
  find_closest_facility_multi_location,
  def_contribution_improve,
  formatJsonData,
  isJsonString,
  handleMultipleLocations,
  handleItem,
  handleStatus,
} from "../../../api/gpt";
import {
  getParamsFromDrawer,
  isCurrentDrawerParams,
} from "../../../utils/routes/params";
import { useSearchParams } from "react-router-dom";
import { useLazyGetPoisQuery } from "../../../api/poi";
import { convertToContributionData } from "../../../constants/gpt";
import { setErrorMessage, setRecommandContributions } from "../../../store/llm";
import { getResourceGroupId } from "../../../utils/resources";
import env from "../../../constants/env";

const LlmInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("OPENAI_API_KEY is set: ", !!env.OPENAI_API_KEY);
  console.log("OPENAI_API_KEY is: ", env.OPENAI_API_KEY?.substring(0, 10));

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmInput"],
  );

  const { t } = useTranslation();

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
            if (!isJsonString(resAll[0])) {
              dispatch(openModal("llmErrorMessage"));
              dispatch(setErrorMessage(resAll[0]));
              console.error("resAll[0] is not a valid JSON string");
              throw new Error("LLM1 Error");
            }

            const {
              樓層: floor,
              參照點: locationName,
              物體: item,
              物體狀態: status,
            } = JSON.parse(resAll[0]);

            // handle edge case of user input
            const location_input = handleMultipleLocations(locationName);
            const item_input = handleItem(item);
            const status_input = handleStatus(status);

            const resourceGroupId = getResourceGroupId();

            if (location_input.length > 1) {
              const {
                closestItemName: tmpTargetMarker,
                itemAddress: tmpItemAddress,
              } = find_closest_facility_multi_location(
                resourceGroupId ? resourceGroupId : "",
                floor,
                location_input[0],
                location_input[1],
                item_input,
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
                location_input[0],
                item_input,
              );

              targetMarker = tmpTargetMarker;
              itemAddress = tmpItemAddress;
            }

            const inputContributions = convertToContributionData(resAll[1]);
            return def_contribution_improve(
              inputContributions,
              targetMarker,
              itemAddress,
              status_input,
            );
          } else {
            throw new Error("LLM1 Error");
          }
        })
        .then((res) => {
          const recommandContributionArray: string[] = Object.values(
            JSON.parse(formatJsonData(res)),
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
    // change to llmResult when waiting for response
    dispatch(closeModal("llmInput"));
    dispatch(openModal("llmResult"));
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
        <ModalHeader className="flex flex-col gap-1">
          {t("llmInput.title", { ns: ["modal"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          <Input
            aria-label="set description"
            placeholder={t("llmInput.content.placeHolder", { ns: ["modal"] })}
            value={description}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            {t("llmInput.buttons.close", { ns: ["modal"] })}
          </Button>
          <Button color="danger" variant="light" onPress={handleCommit}>
            {t("llmInput.buttons.submit", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LlmInput;
