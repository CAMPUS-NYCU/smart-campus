import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { IRootState } from "../../../store";
import { toggleModal } from "../../../store/modal";

const ReportCompletion: React.FC = () => {
  const { t } = useTranslation();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["reportCompletion"],
  );

  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal("reportCompletion"));
  };

  return (
    <Modal
      isOpen={modalOpen}
      onOpenChange={handleToggleModal}
      placement="center"
      classNames={{
        base: "h-1/5 h-fit w-4/5",
      }}
    >
      <ModalContent>
        <ModalHeader />
        <ModalBody className="items-center justify-center">
          <p className="text-xl font-bold">
            {t("reportCompletion.text", { ns: ["modal"] })}
          </p>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ReportCompletion;
