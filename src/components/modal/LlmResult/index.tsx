import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../../store/modal";

const LlmResult: React.FC = () => {
  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmResult"],
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal("llmResult"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("llmResult"));
  };

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">LlmResult</ModalHeader>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            關閉
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LlmResult;
