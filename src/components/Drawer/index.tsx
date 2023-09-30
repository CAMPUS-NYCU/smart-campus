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
  const { children, open, onClose, title, primaryButton, secondaryButton } =
    props;

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-screen \
                 rounded-t-3xl px-6 py-4 z-10 \
               bg-slate-100 dark:bg-slate-800"
      variants={drawerVariants}
      animate={open ? "open" : "closed"}
      initial="closed"
      exit="closed"
    >
      <div className="flex justify-between">
        <h1>{title}</h1>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
      <div className="flex items-center">
        <div className="flex-1 text-left">{secondaryButton}</div>
        <div className="flex-1 text-right">{primaryButton}</div>
      </div>
    </motion.div>
  );
};

export default Drawer;
