import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import React from "react";


export default function ResizablePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      className="relative mb-20  w-full"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div ref={ref} className={height ? "absolute inset-x-0" : "relative"}>
        {children}
      </div>
    </motion.div>
  );
}
