import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";

import SwitchTheme from "../../../theme/SwitchTheme";

import UserFabMenu from "./UserFabMenu";

const Trigger: React.FC = () => {
  return (
    <DropdownTrigger>
      <Avatar
        isBordered
        className="absolute top-0 right-0"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
    </DropdownTrigger>
  );
};

const UserFab: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Dropdown>
        <Trigger />
        <UserFabMenu onOpen={onOpen} />
      </Dropdown>
      <SwitchTheme
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};

export default UserFab;
