import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
} from "@nextui-org/react";
import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";
import { useTranslation } from "react-i18next";

const LlmInput: React.FC = () => {
  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmInput"],
  );

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleCommit = () => {
    console.log("commit");
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
