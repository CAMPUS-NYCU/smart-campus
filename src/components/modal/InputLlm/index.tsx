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
import { closeModal, toggleModal } from "../../../store/modal";
import {
  def_place_and_object,
  def_facility,
  def_contribution,
} from "../../../api/gpt";

const InputLlm: React.FC = () => {
  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["inputLlm"],
  );

  const dispatch = useDispatch();

  async function gptFunction() {
    // wait for def_place_and_object finish to get result
    const result = await def_place_and_object(description);
    console.log("LLM Result", result);
    // result will be the def_facility's input in the future
    def_facility();
    def_contribution();
  }

  const handleCommit = () => {
    console.log("LLM Input", description);
    // call gpt to classify the description
    gptFunction();

    setDescription("");
    dispatch(closeModal("inputLlm"));
  };

  const handleCloseModal = () => {
    setDescription("");
    dispatch(closeModal("inputLlm"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("inputLlm"));
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

export default InputLlm;
