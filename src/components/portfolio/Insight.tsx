import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

// Conceptual scroll visualization — abstract, not real project data.
const dots = Array.from({ length: 22 }, (_, i) => {
  const x = 40 + ((i * 137) % 920);
  const y = 60 + ((i * 89) % 300);
  return [x, y] as const;
});
const bars = [30, 55, 42, 70, 50, 85, 64, 92, 58, 76];
const ease = (a: number, b: number) => [a, b];

function Dot({ x, y, i, p }: { x: number; y: number; i: number; p: MotionValue<number> }) {
  const start = 0.05 + (i / dots.length) * 0.2;
  const o = useTransform(p, ease(start, start + 0.06), [0, 1]);
  const fade = useTransform(p, [0.7, 0.85], [1, 0.15]);
  const op = useTransform([o, fade], ([a, b]) => (a as number) * (b as number));
  return <motion.circle cx={x} cy={y} r={i % 5 === 0 ? 4 : 2.2} className="fill-wine" style={{ opacity: op }} />;
}

function Bar({ h, i, p }: { h: number; i: number; p: MotionValue<number> }) {
  const s = useTransform(p, [0.42 + i * 0.015, 0.58 + i * 0.015], [0, 1]);
  const fade = useTransform(p, [0.72, 0.86], [1, 0.12]);
  return (
    <motion.rect
      x={110 + i * 80}
      y={420 - h * 1.6}
      width="34"
      height={h * 1.6}
      className="fill-wine"
      style={{ scaleY: s, opacity: fade, transformOrigin: "bottom", transformBox: "fill-box" }}
    />
  );
}

export function Insight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line = useTransform(p, [0.25, 0.45], [0, 1]);
  const lineFade = useTransform(p, [0.72, 0.86], [1, 0.15]);
  const labels = useTransform(p, [0.55, 0.62, 0.72, 0.8], [0, 1, 1, 0]);
  const word = useTransform(p, [0.78, 0.92], ["105%", "0%"]);
  const wordOp = useTransform(p, [0.76, 0.84], [0, 1]);
  const tone = useTransform(p, [0.75, 0.95], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="insight-h" className="relative h-[170vh] bg-paper">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-5 pb-8 pt-20 md:px-10 md:pt-20">
        <motion.div className="pointer-events-none absolute inset-0 bg-nude" style={{ opacity: tone }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-4">
            <h2 id="insight-h" className="display text-3xl text-deep sm:text-4xl md:text-6xl">
              Data is not the story.
              <br />
              <em className="text-wine">The story is what we find inside it.</em>
            </h2>
            <span className="label text-[0.6rem] text-muted-foreground">✦ A study in reading data · Conceptual</span>
          </div>

          <div className="relative mt-4 flex-1">
            <svg viewBox="0 0 1000 440" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <line x1="0" y1="420" x2="1000" y2="420" className="stroke-wine" strokeOpacity="0.4" strokeWidth="1" />
              {dots.map(([x, y], i) => (
                <Dot key={i} x={x} y={y} i={i} p={p} />
              ))}
              <motion.path
                d={"M" + dots.filter((_, i) => i % 3 === 0).sort((a, b) => a[0] - b[0]).map((d) => d.join(" ")).join(" L")}
                fill="none"
                className="stroke-wine"
                strokeWidth="1"
                style={{ pathLength: line, opacity: lineFade }}
              />
              {bars.map((h, i) => (
                <Bar key={i} h={h} i={i} p={p} />
              ))}
              <motion.g style={{ opacity: labels }} className="fill-wine" fontSize="11" fontWeight="700" letterSpacing="2.5">
                <text x="40" y="40">QUESTION</text>
                <text x="420" y="40">PATTERN</text>
                <text x="860" y="40">MEANING</text>
              </motion.g>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span className="mask-line" style={{ opacity: wordOp }}>
                <motion.span style={{ y: word }} className="display block text-[22vw] italic text-wine md:text-[17vw]">
                  Insight
                </motion.span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
