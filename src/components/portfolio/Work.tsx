import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project, type Shot } from "@/data/portfolio";
import { CaseStudy } from "./CaseStudy";
import { Reveal } from "./Reveal";

const ease = [0.76, 0, 0.24, 1] as const;

const tools = (p: Project) => p.meta.find((m) => m.label === "Tools")?.value ?? "";
const short = (t: string) => {
  const m = t.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
};

// Homepage = trailer. Only these headline metrics show here; the rest live in the case study.
const HEADLINE: Record<string, string[]> = {
  "01": ["Total sales", "Profit margin"],
  "02": ["Total sales", "Orders"],
};

// Observes an unclipped wrapper; the clipped child animates via variants.
function Dash({ s, className = "", eager = false }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
      <motion.div
        className={"relative overflow-hidden border border-line bg-ivory " + className}
        variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)" } }}
        transition={{ duration: 1.1, ease }}
      >
        <img
          src={s.src}
          alt={s.alt}
          width={s.w}
          height={s.h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full transition-transform duration-1000 ease-out-lux group-hover:scale-[1.02]"
        />
      </motion.div>
    </motion.div>
  );
}

function Head({ p, dark = false, big = false }: { p: Project; dark?: boolean; big?: boolean }) {
  return (
    <>
      <span className={"label flex items-center gap-3 text-[0.6rem] " + (dark ? "text-rose" : "text-wine")}>
        <span className="transition-transform duration-500 ease-out-lux group-hover:translate-x-1">{p.index}</span>
        <span>/ {p.category}</span>
      </span>
      <h3
        className={
          "display mt-3 " +
          (big ? "text-[clamp(3rem,7vw,6.5rem)] " : "text-[clamp(2.2rem,3.6vw,3.4rem)] ") +
          (dark ? "text-paper" : "text-deep")
        }
      >
        {p.client}
      </h3>
      <p className={"mt-1 font-display text-xl italic " + (dark ? "text-nude" : "text-wine")}>{p.title}</p>
    </>
  );
}

// Power BI reports lead with their landing page, with the remaining report pages
// available as small, selectable previews underneath.
function PowerBIVisual({ p, dark = false }: { p: Project; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const shot = p.shots[active]!;
  return (
    <div>
      <div className={"overflow-hidden border bg-ivory " + (dark ? "border-nude/30 shadow-[10px_10px_0_var(--wine)]" : "border-line shadow-[10px_10px_0_var(--deep)]")}>
        <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" className="block h-auto w-full" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {p.shots.map((s, i) => (
          <button
            type="button"
            key={s.label}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Preview ${s.label}`}
            className={"group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine " + (active === i ? "opacity-100" : "opacity-65 transition-opacity hover:opacity-100")}
          >
            <span className={"block overflow-hidden border-2 " + (active === i ? (dark ? "border-nude" : "border-wine") : (dark ? "border-paper/25" : "border-line"))}>
              <img src={s.src} alt="" aria-hidden="true" loading="lazy" className="block aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </span>
            <span className={"label mt-2 block text-[0.48rem] leading-relaxed " + (dark ? "text-nude/80" : "text-deep/70")}>{i === 0 ? "Landing page" : s.label}</span>
          </button>
        ))}
      </div>
      <p className={"label mt-3 text-[0.5rem] " + (dark ? "text-nude/60" : "text-deep/60")}>Select a page preview to explore the report</p>
    </div>
  );
}

// Full-width project sections alternate direction and background tone.
function ProjectSection({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const burgundy = Number(p.index) % 2 === 1;
  const reverse = Number(p.index) % 2 === 0;
  const text = burgundy ? "text-paper" : "text-deep";
  const muted = burgundy ? "text-nude/85" : "text-deep/75";
  const label = burgundy ? "text-rose" : "text-wine";
  const isPowerBI = p.index === "03" || p.index === "04" || p.index === "05";
  const preview = isPowerBI
    ? <PowerBIVisual p={p} dark={burgundy} />
    : <Dash s={p.shots[0]!} className={burgundy ? "border-nude/25 shadow-[10px_10px_0_var(--wine)]" : "shadow-[10px_10px_0_var(--deep)]"} eager={p.index === "01"} />;
  const metrics = (p.metrics ?? []).filter((m) => HEADLINE[p.index]?.includes(m.label));

  return (
    <article
      id={`project-${p.index}`}
      data-project={p.index}
      className={"scroll-mt-20 px-5 py-16 md:px-10 md:py-24 " + (burgundy ? "bg-deep text-paper" : "bg-nude text-deep")}
    >
      <div className={"mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12 md:items-center md:gap-12 " + (reverse ? "md:[&>div:first-child]:order-2" : "")}>
        <div className="group md:col-span-7">
          {isPowerBI ? preview : (
            <button
              type="button"
              onClick={() => onOpen(p)}
              data-cursor="view"
              aria-label={`Open ${p.client} case study`}
              className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            >
              {preview}
            </button>
          )}
        </div>
        <div className="md:col-span-5">
          <span className={"label flex items-center gap-3 text-[0.6rem] " + label}>
            <span>{p.index}</span><span>/ {p.category}</span>
          </span>
          <h3 className={"display mt-4 text-[clamp(2.8rem,5.8vw,5.5rem)] " + text}>{p.client}</h3>
          <p className={"mt-2 font-display text-2xl italic " + (burgundy ? "text-nude" : "text-wine")}>{p.title}</p>
          <p className={"label mt-5 text-[0.58rem] " + label}>{tools(p)}</p>
          <p className={"mt-5 text-sm leading-relaxed md:text-base " + muted}>{p.description}</p>
          {metrics.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className={"border-t pt-3 " + (burgundy ? "border-paper/25" : "border-deep/20")}>
                  <dd className={"display text-3xl " + text}>{m.value}</dd>
                  <dt className={"label mt-2 text-[0.55rem] " + muted}>{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
          <p className={"label mt-5 text-[0.52rem] leading-relaxed " + muted}>
            {p.index === "05" ? "Collaborative · Team leader · Not affiliated with Amazon" : p.disclaimer}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={() => onOpen(p)}
              className={"label inline-flex min-h-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine " + (burgundy ? "text-paper" : "text-wine")}
            >
              <span className="link-underline pb-1">View case study</span><span aria-hidden="true">↗</span>
            </button>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={"label inline-flex min-h-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine " + (burgundy ? "text-nude" : "text-deep")}
            >
              <span className="link-underline pb-1">View repository</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("#work [data-project]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute("data-project"))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const sec = document.getElementById("work");
    const out = new IntersectionObserver(([e]) => !e?.isIntersecting && setActive(null));
    if (sec) out.observe(sec);
    return () => {
      io.disconnect();
      out.disconnect();
    };
  }, []);

  const go = (i: string) => document.getElementById(`project-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[1500px] px-5 pt-28 md:px-10 md:pt-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <span className="label text-wine">Selected work</span>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(3.6rem,9vw,8.5rem)] text-deep">
              <Reveal delay={0.05}>Projects</Reveal>
              <Reveal delay={0.12}>
                <span className="pl-[8vw] italic text-wine">with purpose.</span>
              </Reveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Five analytical projects spanning sales, business intelligence, marketing and supply-chain performance.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="md:col-span-4 md:col-start-9">
            <ol className="border-t border-line">
              {projects.map((p) => (
                <li key={p.index}>
                  <button type="button" onClick={() => go(p.index)} className="group flex min-h-11 w-full items-baseline gap-4 border-b border-line py-2 text-left">
                    <span className="label text-[0.6rem] text-wine">{p.index}</span>
                    <span className="display text-xl text-deep transition-transform duration-500 ease-out-lux group-hover:translate-x-2 group-hover:italic">{p.client}</span>
                    <span className="ml-auto text-wine opacity-0 transition-opacity group-hover:opacity-100">↘</span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

      </div>
      {projects.map((p) => (
        <ProjectSection key={p.index} p={p} onOpen={setOpen} />
      ))}


      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden
            className="label pointer-events-none fixed bottom-6 left-6 z-40 hidden text-[0.6rem] bg-paper/80 px-2 py-1 text-wine md:block"
          >
            {active} / {String(projects.length).padStart(2, "0")}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{open && <CaseStudy key={open.index} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
