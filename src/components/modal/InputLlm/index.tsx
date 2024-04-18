import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";

const InputLlm: React.FC = () => {
  console.log("InputLlm");
  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["inputLlm"],
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal("inputLlm"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("inputLlm"));
  };
  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">"InputLlm"</ModalHeader>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            關閉
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InputLlm;
