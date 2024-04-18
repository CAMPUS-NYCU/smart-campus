import React from "react";
import { Avatar, Dropdown, DropdownTrigger, Skeleton } from "@nextui-org/react";

import { useGetUserQuery } from "../../../../api/user";
import SwitchLanguage from "../../../modal/SwitchLanguage";
import SwitchResource from "../../../modal/SwitchResource";
import SwitchTheme from "../../../modal/SwitchTheme";

import UserFabMenu from "./UserFabMenu";
import Login from "../../../modal/Login";
import InputLlm from "../../../modal/InputLlm";

const Trigger: React.FC = () => {
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  if (userLoading) {
    return (
      <DropdownTrigger>
        <Skeleton className="absolute top-6 right-4 flex rounded-full w-10 h-10" />
      </DropdownTrigger>
    );
  }
  return (
    <DropdownTrigger>
      <Avatar
        isBordered
        className="absolute top-6 right-4 w-10 h-10"
        src={user?.auth.photoURL || ""}
        name={user?.auth.displayName || ""}
      />
    </DropdownTrigger>
  );
};

const UserFab: React.FC = () => {
  return (
    <>
      <Dropdown>
        <Trigger />
        <UserFabMenu />
      </Dropdown>
      <Login />
      <SwitchLanguage />
      <SwitchResource />
      <SwitchTheme />
      <InputLlm />
    </>
  );
};

export default UserFab;
