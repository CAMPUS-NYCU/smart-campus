import React from "react";
import { motion } from "framer-motion";

import { CloseIcon } from "../../utils/icons/drawer";

import { drawerVariants } from "./animation";

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { children, open, onClose, title, primaryButton } = props;

  return (
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
  );
};

export default Drawer;
