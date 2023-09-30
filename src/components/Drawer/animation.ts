import { Variants } from "framer-motion";

export const drawerVariants = {
  closed: {
    y: 16,
    opacity: 0,
    zIndex: -100,
    transition: { duration: 0.2, zIndex: { delay: 0.2 } },
  },
  open: {
    y: 0,
    opacity: 1,
    zIndex: 10,
    transition: { type: "tween", duration: 0.3 },
  },
} satisfies Variants;
