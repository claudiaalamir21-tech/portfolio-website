import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

// Brief intro animation on every page load: CA → drawn line → masked type → panel wipe.
export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-wine"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-paper"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 0.95, duration: 0.45, ease }}
            style={{ transformOrigin: "top" }}
          />
          <motion.span
            className="absolute left-0 top-1/2 h-px w-full bg-paper"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease }}
            style={{ transformOrigin: "left" }}
          />
          <div className="relative flex w-full max-w-[1500px] items-center justify-between px-5 md:px-10">
            <span className="mask-line">
              <motion.span
                className="display block text-7xl text-paper md:text-9xl"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.05, duration: 0.7, ease }}
              >
                CA
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span
                className="label block text-paper"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.5, duration: 0.6, ease }}
              >
                Claudia Al-Amir — Data Analyst
              </motion.span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
