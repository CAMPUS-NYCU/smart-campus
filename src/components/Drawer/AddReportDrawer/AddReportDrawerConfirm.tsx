import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface AddReportDrawerConfirmProps {
  disclosure: ReturnType<typeof useDisclosure>;
  onSubmit: () => void;
}

const AddReportDrawerConfirm: React.FC<AddReportDrawerConfirmProps> = (
  props,
) => {
  const { disclosure, onSubmit } = props;

  const handleSubmit = () => {
    onSubmit();
    disclosure.onClose();
  };
  return (
    <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
        <ModalBody className="items-center">
          Are you sure to add this report?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={disclosure.onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReportDrawerConfirm;
