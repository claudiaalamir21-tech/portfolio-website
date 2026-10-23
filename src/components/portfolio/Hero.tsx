import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { scrollToId } from "@/lib/smooth-scroll";
import { HeroArtwork } from "./HeroArtwork";

const ease = [0.76, 0, 0.24, 1] as const;
const D = 1.4; // after intro

function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="mask-line">
      <motion.span
        className={"block " + className}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay: D + delay, duration: 1.1, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          className="label flex flex-wrap justify-between gap-3 border-b border-line pb-4 text-wine"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: D, duration: 0.8 }}
        >
          <span>Data Analyst</span>
          <span className="hidden sm:inline">Portfolio</span>
          <span>Excel · Power BI</span>
        </motion.div>

        <div className="relative mt-8 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.h1 style={{ y: nameY }} className="display relative z-10 text-wine lg:col-span-8">
            <Line delay={0} className="text-[23vw] lg:text-[15vw]">
              {profile.first}
            </Line>
            <Line delay={0.1} className="pl-[10vw] text-[23vw] italic lg:text-[15vw]">
              {profile.last}
            </Line>
          </motion.h1>

          <motion.div style={{ y: artY }} className="relative w-full lg:col-span-4 lg:ml-auto lg:mt-40 lg:max-w-[380px]">
            <HeroArtwork />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12 lg:mt-12">
          <h2 className="display text-4xl text-ink md:col-span-6 md:text-6xl">
            <Line delay={0.35}>Finding the story</Line>
            <Line delay={0.45}>
              inside the <em className="text-wine">data.</em>
            </Line>
          </h2>
          <motion.div
            className="md:col-span-4 md:col-start-8 md:self-end lg:col-start-1 lg:row-start-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.7, duration: 1, ease }}
          >
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
                className="label link-underline pb-1 text-wine"
              >
                Explore selected work ↓
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="label link-underline pb-1 text-ink">
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
