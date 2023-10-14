import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface EditReportDrawerConfirmProps {
  disclosure: ReturnType<typeof useDisclosure>;
  onSubmit: () => void;
}

const EditReportDrawerConfirm: React.FC<EditReportDrawerConfirmProps> = (
  props,
) => {
  const { disclosure, onSubmit } = props;

  const { t } = useTranslation();

  const handleSubmit = () => {
    onSubmit();
    disclosure.onClose();
  };
  return (
    <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("editReport.confirm.title", { ns: ["drawer"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          {t("editReport.confirm.content", { ns: ["drawer"] })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={disclosure.onClose}>
            {t("editReport.confirm.buttons.cancel", { ns: ["drawer"] })}
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            {t("editReport.confirm.buttons.confirm", { ns: ["drawer"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditReportDrawerConfirm;
