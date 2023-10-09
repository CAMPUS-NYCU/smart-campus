import React from "react";
import { useTranslation } from "react-i18next";
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
  switchLanguageDisclosure: ReturnType<typeof useDisclosure>;
  switchThemeDisclosure: ReturnType<typeof useDisclosure>;
}

const UserFabMenu: React.FC<UserFabMenuProps> = (props) => {
  const { loginDisclosure, switchLanguageDisclosure, switchThemeDisclosure } =
    props;

  const { t } = useTranslation();

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
          {t("fabs.user.menu.options.login", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem key="dashboard">
          {t("fabs.user.menu.options.dashboard", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem key="settings">
          {t("fabs.user.menu.options.settings", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem
          key="language"
          textValue="Language"
          onPress={switchLanguageDisclosure.onOpen}
        >
          {t("fabs.user.menu.options.language", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem
          key="theme"
          textValue="Theme"
          onPress={switchThemeDisclosure.onOpen}
        >
          {t("fabs.user.menu.options.theme", { ns: ["map"] })}
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Help & Feedback">
        <DropdownItem key="help_and_feedback">
          {t("fabs.user.menu.options.helpAndFeedback", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem
          key="logout"
          textValue="logout"
          onPress={logout}
          style={{ display: isLoggedIn ? "block" : "none" }}
        >
          {t("fabs.user.menu.options.logout", { ns: ["map"] })}
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default UserFabMenu;
