import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { isFinePointer, prefersReducedMotion } from "@/lib/smooth-scroll";

type Mode = "default" | "link" | "view" | "drag" | "explore";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    if (!isFinePointer() || prefersReducedMotion() || !mq.matches) return;
    setEnabled(true);
    const off = () => {
      if (!mq.matches) {
        setEnabled(false);
        document.documentElement.classList.remove("has-cursor");
      }
    };
    mq.addEventListener("change", off);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        setVisible(false);
        return;
      }
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const c = t?.closest<HTMLElement>("[data-cursor]");
      if (c?.dataset["cursor"] === "view") setMode("view");
      else if (c?.dataset["cursor"] === "drag") setMode("drag");
      else if (c?.dataset["cursor"] === "explore") setMode("explore");
      else if (t?.closest("a,button")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      mq.removeEventListener("change", off);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" || mode === "drag" || mode === "explore" ? 88 : mode === "link" ? 36 : 8;
  const big = mode === "view" || mode === "drag" || mode === "explore";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className={
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full " +
          (mode === "default" ? "bg-wine" : big ? "bg-wine text-paper" : "border border-wine")
        }
        animate={{ width: size, height: size }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {big && <span className="label text-[0.6rem]">{mode === "view" ? "View ↗" : mode === "explore" ? "Explore" : "Drag"}</span>}
      </motion.div>
    </motion.div>
  );
}
