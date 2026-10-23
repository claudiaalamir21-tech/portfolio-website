import { motion, type MotionValue, useTransform } from "framer-motion";
import type { ProjectArtKind } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

// Stylised, abstract artwork per project. No real data is depicted.
export function ProjectArt({ kind, px, py, dark = false }: { kind: ProjectArtKind; px: MotionValue<number>; py: MotionValue<number>; dark?: boolean }) {
  const lx = useTransform(px, (v) => v * 22);
  const ly = useTransform(py, (v) => v * 22);
  const bx = useTransform(px, (v) => v * -8);
  const by = useTransform(py, (v) => v * -8);
  const stroke = dark ? "text-nude" : "text-wine";

  if (kind === "cells") {
    return (
      <div className="absolute inset-0 p-8">
        <motion.div style={{ x: bx, y: by }} className="grid h-full grid-cols-6 grid-rows-8 border-l border-t border-wine/25">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="border-b border-r border-wine/25"
              initial={{ backgroundColor: "rgba(0,0,0,0)" }}
              whileInView={[7, 15, 22, 26, 33, 40].includes(i) ? { backgroundColor: "rgba(112,45,59,0.85)" } : {}}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i % 7) * 0.08, duration: 0.6 }}
            />
          ))}
        </motion.div>
        <motion.div style={{ x: lx, y: ly }} className="absolute bottom-10 right-10 bg-ivory px-5 py-4 shadow-[12px_12px_0_var(--deep)]">
          <span className="label text-wine">Σ Sum / Range</span>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {[40, 65, 50, 85, 70].map((h, i) => (
              <motion.span key={i} className="w-3 origin-bottom bg-wine" style={{ height: `${h}%` }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease }} />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (kind === "lines") {
    return (
      <div className="absolute inset-0 p-8">
        <motion.svg style={{ x: bx, y: by }} viewBox="0 0 300 220" className="h-full w-full text-wine" aria-hidden="true">
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
          ))}
          <motion.path d="M0 170 C40 160 60 120 100 128 S160 70 200 84 S260 40 300 30" fill="none" stroke="currentColor" strokeWidth="1.4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease }} />
          <motion.path d="M0 190 C50 186 80 160 120 166 S190 130 230 140 S280 110 300 104" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1.8, ease }} />
          {[[100, 128], [200, 84], [300, 30]].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.2 }} />
          ))}
        </motion.svg>
        <motion.div style={{ x: lx, y: ly }} className="display absolute left-10 top-10 text-7xl italic text-wine/80">
          H2H
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-3 p-6 md:p-10">
      <motion.div style={{ x: bx, y: by }} className={"col-span-2 row-span-1 border border-nude/30 p-4 " + stroke}>
        <span className="label text-[0.6rem] opacity-70">Sales</span>
        <div className="mt-3 h-px w-full bg-nude/40" />
      </motion.div>
      <motion.div style={{ x: bx, y: by }} className={"col-span-2 border border-nude/30 p-4 " + stroke}>
        <span className="label text-[0.6rem] opacity-70">Profit</span>
        <div className="mt-3 h-px w-2/3 bg-nude/40" />
      </motion.div>
      <motion.div style={{ x: bx, y: by }} className={"col-span-2 border border-nude/30 p-4 " + stroke}>
        <span className="label text-[0.6rem] opacity-70">Returns</span>
        <div className="mt-3 h-px w-1/3 bg-nude/40" />
      </motion.div>
      <motion.div style={{ x: lx, y: ly }} className="col-span-4 row-span-3 flex items-end gap-2 border border-nude/30 p-5">
        {[30, 48, 40, 62, 55, 80, 66, 92, 74].map((h, i) => (
          <motion.span key={i} className="flex-1 origin-bottom bg-nude" style={{ height: `${h}%`, opacity: 0.3 + i * 0.08 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06, duration: 0.9, ease }} />
        ))}
      </motion.div>
      <motion.div style={{ x: bx, y: by }} className="col-span-2 row-span-3 flex items-center justify-center border border-nude/30">
        <svg viewBox="0 0 100 100" className="w-3/4 text-nude" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="10" />
          <motion.circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(-90 50 50)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.68 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1.6, ease }} />
        </svg>
      </motion.div>
    </div>
  );
}
