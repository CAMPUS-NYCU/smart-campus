import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  User,
  useDisclosure,
} from "@nextui-org/react";

import {
  useGetUserQuery,
  useIsLoggedInQuery,
  useLogoutMutation,
} from "../../../../../api/user";

const MenuItemUser: React.FC = () => {
  const { data: user } = useGetUserQuery();

  return (
    <User
      name={user?.auth.displayName}
      description={user?.id}
      classNames={{
        name: "text-default-600",
        description: "text-default-500",
      }}
      avatarProps={{
        size: "sm",
        src: user?.auth.photoURL || "",
      }}
    />
  );
};

interface UserFabMenuProps {
  loginDisclosure: ReturnType<typeof useDisclosure>;
  switchThemeDisclosure: ReturnType<typeof useDisclosure>;
}

const UserFabMenu: React.FC<UserFabMenuProps> = (props) => {
  const { loginDisclosure, switchThemeDisclosure } = props;
  const { data: isLoggedIn } = useIsLoggedInQuery();
  const [logout] = useLogoutMutation();

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
          hidden={!isLoggedIn}
        >
          <MenuItemUser />
        </DropdownItem>
        <DropdownItem
          key="login"
          textValue="login"
          onPress={loginDisclosure.onOpen}
          style={{ display: isLoggedIn ? "none" : "block" }}
        >
          Login
        </DropdownItem>
        <DropdownItem key="dashboard">Dashboard</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem
          key="theme"
          textValue="Theme"
          onPress={switchThemeDisclosure.onOpen}
        >
          Change Theme
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Help & Feedback">
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          key="logout"
          textValue="logout"
          onPress={logout}
          style={{ display: isLoggedIn ? "block" : "none" }}
        >
          logout
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default UserFabMenu;
