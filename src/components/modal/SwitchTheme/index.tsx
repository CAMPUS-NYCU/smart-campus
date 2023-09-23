import React from "react";
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
  const { theme, setTheme, forcedTheme } = useTheme();
  const handleSelectionChange = (key: React.Key) => {
    setTheme(key as string);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Change Theme</ModalHeader>
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
                  <span>Light</span>
                </div>
              }
            />
            <Tab
              key="dark"
              title={
                <div className="flex items-center space-x-2">
                  <DarkThemeIcon />
                  <span>Dark</span>
                </div>
              }
            />
            <Tab
              key="system"
              title={
                <div className="flex items-center space-x-2">
                  <SystemThemeIcon />
                  <span>System</span>
                </div>
              }
            />
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchTheme;
