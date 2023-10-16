import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";

interface AddReportDrawerConfirmProps {
  onSubmit: () => void;
}

const AddReportDrawerConfirm: React.FC<AddReportDrawerConfirmProps> = (
  props,
) => {
  const { onSubmit } = props;

  const { t } = useTranslation();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["confirmAddReport"],
  );

  const dispatch = useDispatch();

  const handleSubmit = () => {
    onSubmit();
    dispatch(closeModal("confirmAddReport"));
  };

  const handleCloseModal = () => {
    dispatch(closeModal("confirmAddReport"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("confirmAddReport"));
  };

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("addReport.confirm.title", { ns: ["drawer"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          {t("addReport.confirm.content", { ns: ["drawer"] })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            {t("addReport.confirm.buttons.cancel", { ns: ["drawer"] })}
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            {t("addReport.confirm.buttons.confirm", { ns: ["drawer"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReportDrawerConfirm;
