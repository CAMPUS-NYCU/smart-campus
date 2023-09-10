import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  User,
} from "@nextui-org/react";

const UserSection: React.FC = () => {
  return (
    <User
      name="Junior Garcia"
      description="@jrgarciadev"
      classNames={{
        name: "text-default-600",
        description: "text-default-500",
      }}
      avatarProps={{
        size: "sm",
        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
      }}
    />
  );
};

const UserFabMenu: React.FC<{ onOpen: () => void }> = (props) => {
  const { onOpen } = props;

  return (
    <DropdownMenu
      aria-label="Custom item styles"
      className="p-3"
      itemClasses={{
        base: [
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-default-100",
          "dark:data-[hover=true]:bg-default-50",
          "data-[selectable=true]:focus:bg-default-50",
          "data-[pressed=true]:opacity-70",
          "data-[focus-visible=true]:ring-default-500",
        ],
      }}
      variant="faded"
    >
      <DropdownSection aria-label="Profile & Actions" showDivider>
        <DropdownItem
          key="profile"
          className="h-14 gap-2 opacity-100"
          textValue="User Section"
        >
          <UserSection />
        </DropdownItem>
        <DropdownItem key="dashboard">Dashboard</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="theme" textValue="Theme" onPress={onOpen}>
          Change Theme
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Help & Feedback">
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout">Log Out</DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default UserFabMenu;
