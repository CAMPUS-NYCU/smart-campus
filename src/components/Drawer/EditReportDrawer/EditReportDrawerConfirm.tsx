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

import ReportCompletion from "../../modal/ReportCompletion";
import { IRootState } from "../../../store";
import { closeModal, toggleModal, openModal } from "../../../store/modal";

interface EditReportDrawerConfirmProps {
  onSubmit: () => void;
}

const EditReportDrawerConfirm: React.FC<EditReportDrawerConfirmProps> = (
  props,
) => {
  const { onSubmit } = props;

  const { t } = useTranslation();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["confirmEditReport"],
  );

  const dispatch = useDispatch();

  const handleSubmit = () => {
    onSubmit();
    dispatch(closeModal("confirmEditReport"));
    dispatch(openModal("reportCompletion"));
  };

  const handleCloseModal = () => {
    dispatch(closeModal("confirmEditReport"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("confirmEditReport"));
  };

  return (
    <>
      <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {t("editReport.confirm.title", { ns: ["drawer"] })}
          </ModalHeader>
          <ModalBody className="items-center">
            {t("editReport.confirm.content", { ns: ["drawer"] })}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              {t("editReport.confirm.buttons.cancel", { ns: ["drawer"] })}
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              {t("editReport.confirm.buttons.confirm", { ns: ["drawer"] })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ReportCompletion />
    </>
  );
};

export default EditReportDrawerConfirm;
