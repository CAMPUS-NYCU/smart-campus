import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  User,
} from "@nextui-org/react";

import {
  useGetUserQuery,
  useIsLoggedInQuery,
  useLogoutMutation,
} from "../../../../../api/user";
import { openModal } from "../../../../../store/modal";
import { useSearchParams } from "react-router-dom";
import { resetDrawerParams } from "../../../../../utils/routes/params";
import {
  resetFilterPoiFloors,
  resetFilterPoiStatuses,
  resetFilterPoiTargetNames,
} from "../../../../../store/filter";

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

const UserFabMenu: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleOpenLoginModal = () => {
    dispatch(openModal("login"));
  };

  const handleOpenSwitchLanguageModal = () => {
    dispatch(openModal("switchLanguage"));
  };

  const handleOpenSwitchResourceModal = () => {
    dispatch(openModal("switchResource"));
  };

  const handleOpenSwitchThemeModal = () => {
    dispatch(openModal("switchTheme"));
  };

  const { data: isLoggedIn } = useIsLoggedInQuery();
  const [logout] = useLogoutMutation();

  // for back to homepage
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBackToHome = () => {
    resetDrawerParams(searchParams, setSearchParams);
    dispatch(resetFilterPoiFloors());
    dispatch(resetFilterPoiTargetNames());
    dispatch(resetFilterPoiStatuses());
  };

  return (
    <DropdownMenu
      aria-label="User Fab Menu"
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
          onPress={handleOpenLoginModal}
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
        <DropdownItem key="homepage" onPress={handleBackToHome}>
          {"回主頁面"}
        </DropdownItem>
        <DropdownItem
          key="language"
          textValue="Language"
          onPress={handleOpenSwitchLanguageModal}
        >
          {t("fabs.user.menu.options.language", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem
          key="resource"
          textValue="Resource"
          onPress={handleOpenSwitchResourceModal}
        >
          {t("fabs.user.menu.options.resource", { ns: ["map"] })}
        </DropdownItem>
        <DropdownItem
          key="theme"
          textValue="Theme"
          onPress={handleOpenSwitchThemeModal}
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
