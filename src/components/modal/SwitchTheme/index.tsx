import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme } from "next-themes";

import {
  DarkThemeIcon,
  LightThemeIcon,
  SystemThemeIcon,
} from "../../../utils/icons/theme";

interface SwitchThemeProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

const SwitchTheme: React.FC<SwitchThemeProps> = (props) => {
  const { isOpen, onOpenChange, onClose } = props.disclosure;

  const { t } = useTranslation();
  const { theme, setTheme, forcedTheme } = useTheme();
  const handleSelectionChange = (key: React.Key) => {
    setTheme(key as string);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
          <Button color="danger" variant="light" onPress={onClose}>
            {t("switchTheme.buttons.close", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchTheme;
