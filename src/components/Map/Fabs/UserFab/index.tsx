import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";

import { useGetUserQuery } from "../../../../api/user";
import SwitchTheme from "../../../modal/SwitchTheme";

import UserFabMenu from "./UserFabMenu";
import Login from "../../../modal/Login";

const Trigger: React.FC = () => {
  const { data: user } = useGetUserQuery();

  return (
    <DropdownTrigger>
      <Avatar
        isBordered
        className="absolute top-6 right-4"
        src={user?.auth.photoURL || ""}
        name={user?.auth.displayName || ""}
      />
    </DropdownTrigger>
  );
};

const UserFab: React.FC = () => {
  const loginDisclosure = useDisclosure();
  const switchThemeDisclosure = useDisclosure();

  return (
    <>
      <Dropdown>
        <Trigger />
        <UserFabMenu
          loginDisclosure={loginDisclosure}
          switchThemeDisclosure={switchThemeDisclosure}
        />
      </Dropdown>
      <Login disclosure={loginDisclosure} />
      <SwitchTheme disclosure={switchThemeDisclosure} />
    </>
  );
};

export default UserFab;
