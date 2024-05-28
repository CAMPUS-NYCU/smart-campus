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
import { openModal, toggleModal } from "../../../store/modal";
import { useSearchParams } from "react-router-dom";
import { getParamsFromDrawer } from "../../../utils/routes/params";

const LlmErrorMessage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const clusterId = getParamsFromDrawer("cluster", searchParams).clusterId;

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["llmErrorMessage"],
  );

  const errorMessage = useSelector(
    (state: IRootState) => state.llm.errorMessage,
  );

  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal("llmErrorMessage"));
    dispatch(openModal("llmInput"));
    setSearchParams({ clusterId });
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
        <ModalHeader>
          <p className="text-xl font-bold">
            {t("llmErrorMessage.title", { ns: ["modal"] })}
          </p>
        </ModalHeader>
        <ModalBody className="items-center justify-center">
          <p className="text-sm">{errorMessage}</p>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LlmErrorMessage;
