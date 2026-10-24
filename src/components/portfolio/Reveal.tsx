import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Mask reveal: content rises from behind a clipping line.
// The visible wrapper is observed (not the clipped child) so the trigger always fires.
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.span
      className={"mask-line " + className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ delay, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
