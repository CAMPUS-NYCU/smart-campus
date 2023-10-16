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
  Tab,
  Tabs,
} from "@nextui-org/react";

import { languageConfigs } from "../../../locale/config";
import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";

const SwitchLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["switchLanguage"],
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal("switchLanguage"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("switchLanguage"));
  };

  const handleSelectionChange = (key: React.Key) => {
    i18n.changeLanguage(key as string);
  };

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("switchLanguage.title", { ns: ["modal"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          <Tabs
            aria-label="Options"
            selectedKey={i18n.language}
            onSelectionChange={handleSelectionChange}
          >
            {Object.entries(languageConfigs).map(([code, config]) => (
              <Tab
                key={code}
                title={
                  <div className="flex items-center space-x-2">
                    <span>{config.name}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            {t("switchLanguage.buttons.close", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchLanguage;
