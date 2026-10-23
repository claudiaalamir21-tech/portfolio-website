import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { scrollToId } from "@/lib/smooth-scroll";
import { Reveal } from "./Reveal";

function Magnetic({ children, href, external = false }: { children: ReactNode; href: string; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="label flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-wine text-center text-wine transition-colors duration-500 hover:bg-wine hover:text-paper md:h-40 md:w-40"
    >
      {children}
    </motion.a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-nude px-5 pb-10 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <span className="label text-wine">Contact</span>
        </Reveal>
        <h2 className="display mt-8 text-[17vw] text-deep md:text-[11vw]">
          <Reveal delay={0.05}>Let's turn</Reveal>
          <Reveal delay={0.12}>
            <span className="pl-[10vw] italic text-wine">data into</span>
          </Reveal>
          <Reveal delay={0.19}>direction.</Reveal>
        </h2>

        <div className="mt-16 grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-3xl italic text-deep">Have a question or an opportunity?</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              I'd love to connect with people who value curiosity, clear thinking, and data-informed decisions.
            </p>
            <a href={`mailto:${profile.email}`} data-cursor="explore" className="group/m mt-10 inline-flex max-w-full items-end gap-3">
              <span className="display link-underline break-all pb-2 text-3xl text-wine md:text-6xl">{profile.email}</span>
              <span className="display text-4xl text-wine transition-transform duration-700 ease-out-lux group-hover/m:-translate-y-2 group-hover/m:translate-x-2 md:text-6xl">↗</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:col-start-8 md:justify-end">
            <Magnetic href={`mailto:${profile.email}`}>Email me ↗</Magnetic>
            <Magnetic href={profile.linkedin} external>
              LinkedIn ↗
            </Magnetic>
            <Magnetic href={profile.github} external>
              GitHub ↗
            </Magnetic>
          </div>
        </div>

        <footer className="label mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-wine/25 pt-6 text-[0.6rem] text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}. Built with care.
          </span>
          <span className="flex gap-6">
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline hover:text-wine">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline hover:text-wine">
              LinkedIn ↗
            </a>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("top");
              }}
              className="link-underline hover:text-wine"
            >
              Back to top ↑
            </a>
          </span>
        </footer>
      </div>
    </section>
  );
}
