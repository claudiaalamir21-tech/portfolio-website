import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const quote = ["Good analysis doesn't stop", "at what happened. It helps us", "understand what to do next."];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-wine px-5 py-20 text-paper md:px-10 md:py-24">
      <motion.span
        style={{ x }}
        aria-hidden="true"
        className="display pointer-events-none absolute left-0 top-10 whitespace-nowrap text-[28vw] italic text-paper/[0.045] uppercase not-italic"
      >
        perspective
      </motion.span>

      <div className="relative mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <span className="label text-nude">A little about me</span>
          </Reveal>
          <h2 className="display mt-6 text-6xl md:text-7xl">
            <Reveal delay={0.05}>Analytical</Reveal>
            <Reveal delay={0.1}>thinking.</Reveal>
            <Reveal delay={0.15}>
              <em className="text-rose">Human</em>
            </Reveal>
            <Reveal delay={0.2}>
              <em className="text-rose">perspective.</em>
            </Reveal>
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-nude md:col-span-5 md:col-start-8 md:pt-14 md:text-xl">
          <p>
            I'm Claudia Al-Amir, a data analyst focused on turning complex information into clear, useful stories. I enjoy
            exploring business questions, finding patterns in data, and presenting findings in a way that supports better decisions.
          </p>
          <p>
            My portfolio reflects my ongoing learning through hands-on projects in Excel and Power BI, from data preparation and analysis
            to dashboards, reporting, and recommendations.
          </p>
        </div>

        <blockquote className="mt-4 border-t border-paper/20 pt-8 md:col-span-11 md:mt-8">
          <span className="display text-7xl leading-none text-rose" aria-hidden="true">
            “
          </span>
          <p className="display -mt-6 text-3xl italic text-paper md:text-5xl">
            {quote.map((l, i) => (
              <Reveal key={i} delay={i * 0.12}>
                {l}
              </Reveal>
            ))}
            <Reveal delay={quote.length * 0.12}>”</Reveal>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
