import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { IRootState } from "../../../store";
import { closeModal, toggleModal } from "../../../store/modal";
import {
  getResourceId,
  getResourceGroupId,
  setResourceId,
  setResourceGroupId,
} from "../../../utils/resources";

import ResourceSelect from "./ResourceSelect";
import ResourceGroupSelect from "./ResourceGroupSelect";

const SwitchResource: React.FC = () => {
  const { t } = useTranslation();

  const [tmpResourceGroupId, setTmpResourceGroupId] = React.useState<
    string | null
  >(null);
  const resetTmpResourceGroupId = () =>
    setTmpResourceGroupId(getResourceGroupId());
  const [tmpResource, setTmpResourceId] = React.useState<string | null>(null);
  const resetTmpResourceId = () => setTmpResourceId(getResourceId());

  const modalOpen = useSelector(
    (state: IRootState) => state.modal.open["switchResource"],
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal("switchResource"));
  };

  const handleConfirm = () => {
    setResourceGroupId(tmpResourceGroupId);
    setResourceId(tmpResource);
    dispatch(closeModal("switchResource"));
  };

  const handleToggleModal = () => {
    dispatch(toggleModal("switchResource"));
  };

  const handleResourceGroupSelect = (key: string | null) => {
    if (key !== tmpResourceGroupId) {
      setTmpResourceGroupId(key);
      setTmpResourceId(null);
    }
  };

  const handleResourceSelect = (key: string | null) => {
    setTmpResourceId(key);
  };

  React.useEffect(() => {
    resetTmpResourceGroupId();
    resetTmpResourceId();
  }, [modalOpen]);

  return (
    <Modal isOpen={modalOpen} onOpenChange={handleToggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("switchResource.title", { ns: ["modal"] })}
        </ModalHeader>
        <ModalBody className="items-center">
          <ResourceGroupSelect
            selectedKey={tmpResourceGroupId}
            onSelect={handleResourceGroupSelect}
          />
          <ResourceSelect
            selectedKey={tmpResource}
            resourceGroupId={tmpResourceGroupId}
            onSelect={handleResourceSelect}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            {t("switchResource.buttons.cancel", { ns: ["modal"] })}
          </Button>
          <Button color="primary" onPress={handleConfirm}>
            {t("switchResource.buttons.confirm", { ns: ["modal"] })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwitchResource;
