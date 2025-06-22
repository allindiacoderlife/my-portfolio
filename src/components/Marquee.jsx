import { motion } from "motion/react";
export default function Marquee({ children , reverse = false, pauseOnHover = false }) {
  return (
    <div className="flex flex-row gap-2 cursor-pointer">
      <motion.div
        initial={{ x: reverse ? "-100%" : 0 }}
        animate={{ x: reverse ? 0 : "-100%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex flex-row gap-2">
        {children}
      </motion.div>
      <motion.div
       initial={{ x: reverse ? "-100%" : 0 }}
        animate={{ x: reverse ? 0 : "-100%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex flex-row gap-2">
        {children}
      </motion.div>
    </div>
  );
}
