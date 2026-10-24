import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const bars = [34, 52, 44, 78, 63, 96, 71];
const points = [
  [20, 150],
  [62, 118],
  [104, 132],
  [146, 84],
  [188, 96],
  [230, 46],
  [262, 58],
];
const labels = ["Q", "Σ", "Δ", "μ", "→"];
const ease = [0.22, 1, 0.36, 1] as const;

// Abstract editorial artwork about analytical thinking — decorative only, no real figures implied.
export function HeroArtwork() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const back = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -10) };
  const mid = { x: useTransform(sx, (v) => v * 8), y: useTransform(sy, (v) => v * 8) };
  const front = { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 18) };
  const [hover, setHover] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => (t + 1) % labels.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative aspect-[4/5] w-full"
      data-cursor="explore"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={back} className="absolute inset-0 translate-x-4 translate-y-4 bg-deep md:translate-x-6 md:translate-y-6" />
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ delay: 1.6, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 overflow-hidden bg-nude p-6 md:p-7"
      >
        <div className="label flex justify-between text-[0.6rem] text-wine">
          <span>Insight / 001</span>
          <span className="flex h-3 overflow-hidden">
            <span>Var&nbsp;</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={tick} initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease }}>
                {labels[tick]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* rings */}
        <motion.svg style={back} viewBox="0 0 200 200" className="absolute -right-16 top-10 w-60 text-wine/35" aria-hidden="true">
          <g style={{ transformOrigin: "100px 100px", animation: "slow-spin 40s linear infinite" }}>
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 5" />
            <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="196" cy="100" r="3" fill="currentColor" />
          </g>
        </motion.svg>

        <motion.p style={front} className="display relative mt-8 text-3xl text-deep md:text-4xl">
          Numbers with a
          <br />
          <em className="text-wine">point of view.</em>
        </motion.p>

        {/* scatter + axes */}
        <motion.svg style={mid} viewBox="0 0 280 170" className="absolute inset-x-6 top-[38%] text-wine md:inset-x-7" aria-hidden="true">
          <motion.line x1="8" y1="0" x2="8" y2="164" stroke="currentColor" strokeWidth="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.2, duration: 1, ease }} />
          <motion.line x1="8" y1="164" x2="280" y2="164" stroke="currentColor" strokeWidth="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.3, duration: 1.2, ease }} />
          {[40, 80, 120].map((y) => (
            <motion.line key={y} x1="8" x2="280" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" strokeDasharray="1 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5, duration: 1.4 }} />
          ))}
          <motion.polyline
            points={points.map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.7, duration: 1.6, ease }}
          />
          {points.map(([x, y], i) => (
            <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.8 + i * 0.12, duration: 0.5 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r={i === 5 ? 4 : 2.2} fill="currentColor" />
              {i === 5 && <circle cx={x} cy={y} r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />}
            </motion.g>
          ))}
          <motion.text x="238" y="34" className="fill-current" style={{ fontSize: 7, letterSpacing: 1.4, fontWeight: 700 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>
            PATTERN
          </motion.text>
        </motion.svg>

        {/* bars */}
        <div className="absolute inset-x-6 bottom-6 md:inset-x-7 md:bottom-7">
          <div className="flex h-16 items-end gap-2 border-b border-wine/60">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="relative flex-1 origin-bottom bg-wine"
                style={{ height: `${h}%`, opacity: 0.3 + (i / bars.length) * 0.7 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hover === i ? 1.12 : 1 }}
                transition={{ delay: hover === null ? 2.1 + i * 0.07 : 0, duration: 0.9, ease }}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
              />
            ))}
          </div>
          <div className="label mt-3 flex justify-between text-[0.5rem] text-muted-foreground">
            <span>Question</span>
            <span>Pattern</span>
            <span>Insight</span>
            <span>Decision</span>
          </div>
        </div>
      </motion.div>
      <motion.span style={front} className="display absolute -left-6 top-1/4 text-6xl text-wine md:-left-10" aria-hidden="true">
        ✳
      </motion.span>
    </div>
  );
}
