import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { useTheme } from "next-themes";

const SwitchTheme: React.FC = () => {
  const { theme, setTheme, forcedTheme } = useTheme();
  const handleSelectionChange = (key: React.Key) => {
    setTheme(key as string);
  };
  return (
    <Tabs
      aria-label="Options"
      selectedKey={theme}
      onSelectionChange={handleSelectionChange}
      isDisabled={!!forcedTheme}
    >
      <Tab key="light" title="Light" />
      <Tab key="dark" title="Dark" />
      <Tab key="system" title="System" />
    </Tabs>
  );
};

export default SwitchTheme;
