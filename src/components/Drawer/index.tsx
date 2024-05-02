import React from "react";
import { motion, useDragControls } from "framer-motion";

import { CloseIcon } from "../../utils/icons/drawer";

import { drawerVariants, draggableDrawerVariants } from "./animation";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  isDraggable?: boolean;
  description?: string;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    children,
    open,
    onClose,
    title,
    primaryButton,
    isDraggable = false,
    description,
  } = props;

  const { t } = useTranslation();

  const controls = useDragControls();

  const [isListOpen, setIsListOpen] = React.useState(open);

  React.useEffect(() => {
    setIsListOpen(open);
  }, [open]);

  const toggleDrawer = () => {
    if (isListOpen) {
      setIsListOpen(false);
    } else {
      setIsListOpen(true);
    }
  };

  return (
    <>
      {isDraggable ? (
        <>
          <div className={open ? "fixed left-2 bottom-2" : "hidden"}>
            <Button className="bg-primary" onClick={toggleDrawer}>
              {t("clusterDrawer.buttons.openList", { ns: "drawer" })}
            </Button>
          </div>
          <motion.div
            className="fixed bottom-0 left-0 w-screen \
                 rounded-t-3xl px-4 py-1 z-10 \
               bg-white dark:bg-slate-800 h-[50vh]"
            variants={draggableDrawerVariants}
            animate={isListOpen ? "open" : "closed"}
            initial="closed"
            exit="closed"
            drag="y"
            dragControls={controls}
            dragElastic={{
              top: 0,
              bottom: 1,
            }}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            onDragEnd={(_event, info) => {
              if (info.offset.y > 100) {
                setIsListOpen(false);
              }
            }}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-between space-x-2">
                <div className="flex flex-col justify-between">
                  <h1 className="font-bold">{title}</h1>
                  <p className="text-xs text-start">{description}</p>
                </div>
                <div className="flex flex-auto flex-col justify-center">
                  {primaryButton}
                </div>
                <div className="flex flex-none">
                  <button
                    onClick={() => {
                      onClose();
                      setIsListOpen(false);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div
                className="max-h-[calc(50vh-42px)] 
              overflow-y-auto" /** 42px is the height of the header and footer */
              >
                {children}
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="fixed bottom-0 left-0 w-screen \
                 rounded-t-3xl px-4 py-1 z-10 \
               bg-white dark:bg-slate-800 h-[50vh]"
          variants={drawerVariants}
          animate={open ? "open" : "closed"}
          initial="closed"
          exit="closed"
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="font-bold">{title}</h1>
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div
              className="max-h-[calc(50vh-64px)] 
          overflow-y-auto" /** 64px is the height of the header and footer */
            >
              {children}
            </div>
            <div
              className={
                primaryButton
                  ? "fixed bottom-0 left-0 right-0 flex w-full z-10 px-4 py-1 rounded items-center bg-white"
                  : "hidden"
              }
            >
              <div className="flex-1 text-center">{primaryButton}</div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Drawer;
