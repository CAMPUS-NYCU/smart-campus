import React from "react";
import { motion } from "framer-motion";

import { CloseIcon } from "../../utils/icons/drawer";

import { draggableDrawerVariants } from "./animation";
import { Button } from "@nextui-org/react";

interface DraggableDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  description?: string;
}

const DraggableDrawer: React.FC<DraggableDrawerProps> = (props) => {
  const { children, open, onClose, title, primaryButton, description } = props;

  const dragFieldRef = React.useRef<HTMLDivElement>(null);

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
    <div className="relative overflow-hidden h-full">
      <div className={open ? "fixed left-2 bottom-2" : "hidden"}>
        <Button onClick={toggleDrawer}>Toggle</Button>
      </div>

      <motion.div
        className="absolute top-[100vh] left-0 w-screen"
        ref={dragFieldRef}
      >
        <motion.div
          className="fixed bottom-0 left-0 w-screen \
                 rounded-t-3xl px-4 py-1 z-10 \
               bg-white dark:bg-slate-800 h-[50vh]"
          variants={draggableDrawerVariants}
          animate={isListOpen ? "open" : "closed"}
          initial="closed"
          exit="closed"
          drag="y"
          dragElastic={0}
          dragConstraints={dragFieldRef}
          onDragEnd={(_event, info) => {
            if (info.offset.y > 50) {
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
            <div className="max-h-[calc(50vh-42px)] overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DraggableDrawer;
