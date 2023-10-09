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

import { languageConfigs } from "../../../locale/config";

interface SwitchLanguageProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

const SwitchLanguage: React.FC<SwitchLanguageProps> = (props) => {
  const { isOpen, onOpenChange, onClose } = props.disclosure;

  const { t, i18n } = useTranslation();
  const handleSelectionChange = (key: React.Key) => {
    i18n.changeLanguage(key as string);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
          <Button color="danger" variant="light" onPress={onClose}>
            {t("switchLanguage.buttons.close", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchLanguage;
