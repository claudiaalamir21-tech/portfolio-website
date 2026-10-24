import type Lenis from "lenis";

// Shared handle to the single Lenis instance created by <SmoothScroll />.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToId(id: string) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.6 });
  } else if (el === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function lockScroll(lock: boolean) {
  if (instance) {
    if (lock) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
