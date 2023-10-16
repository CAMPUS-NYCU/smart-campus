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
import { useTheme } from "next-themes";

import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";
import {
  DarkThemeIcon,
  LightThemeIcon,
  SystemThemeIcon,
} from "../../../utils/icons/theme";

const SwitchTheme: React.FC = () => {
  const { t } = useTranslation();

  const { theme, setTheme, forcedTheme } = useTheme();

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["switchTheme"],
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal("switchTheme"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("switchTheme"));
  };

  const handleSelectionChange = (key: React.Key) => {
    setTheme(key as string);
  };

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("switchTheme.title", { ns: ["modal"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          <Tabs
            aria-label="Options"
            selectedKey={theme}
            onSelectionChange={handleSelectionChange}
            isDisabled={!!forcedTheme}
          >
            <Tab
              key="light"
              title={
                <div className="flex items-center space-x-2">
                  <LightThemeIcon />
                  <span>
                    {t("switchTheme.options.light", { ns: ["modal"] })}
                  </span>
                </div>
              }
            />
            <Tab
              key="dark"
              title={
                <div className="flex items-center space-x-2">
                  <DarkThemeIcon />
                  <span>
                    {t("switchTheme.options.dark", { ns: ["modal"] })}
                  </span>
                </div>
              }
            />
            <Tab
              key="system"
              title={
                <div className="flex items-center space-x-2">
                  <SystemThemeIcon />
                  <span>
                    {t("switchTheme.options.system", { ns: ["modal"] })}
                  </span>
                </div>
              }
            />
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            {t("switchTheme.buttons.close", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchTheme;
