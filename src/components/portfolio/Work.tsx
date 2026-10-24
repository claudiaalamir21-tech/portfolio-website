import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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

function Cta({ dark = false }: { dark?: boolean }) {
  return (
    <span className={"label mt-6 inline-flex min-h-11 items-center gap-3 " + (dark ? "text-paper" : "text-wine")}>
      <span className="link-underline pb-1">View case study</span>
      <span className="transition-transform duration-500 ease-out-lux group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
    </span>
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

function Card({ p, onOpen, wide = false, extra }: { p: Project; onOpen: (p: Project) => void; wide?: boolean; extra?: React.ReactNode }) {
  const metrics = (p.metrics ?? []).filter((m) => HEADLINE[p.index]?.includes(m.label));
  const open = () => onOpen(p);
  return (
    <article id={`project-${p.index}`} data-project={p.index} className={"group scroll-mt-28 " + (wide ? "md:col-span-7" : "md:col-span-5")}>
      {extra ?? (
        <button type="button" onClick={open} data-cursor="view" aria-label={`${p.client} — view case study`} className="block w-full text-left">
          <Dash s={p.shots[0]!} className="shadow-[10px_10px_0_var(--deep)]" eager={p.index === "01"} />
        </button>
      )}
      <div className="mt-7">
        <Head p={p} />
        <p className="label mt-4 text-[0.6rem] text-muted-foreground">{tools(p)}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{short(p.description)}</p>
        {metrics.length > 0 && (
          <dl className="mt-5 flex gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="border-t border-line pt-2">
                <dd className="display text-2xl text-deep">{m.value}</dd>
                <dt className="label mt-1 text-[0.55rem] text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <button type="button" onClick={open} aria-label={`${p.client} — view case study`} className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine">
            <Cta />
          </button>
          <span className="label text-[0.5rem] text-muted-foreground/80">{p.index === "05" ? "Collaborative · Team leader · Not affiliated with Amazon" : "Simulated dataset"}</span>
        </div>
      </div>
    </article>
  );
}

// 04 — compact Hive switcher: one panel, small tabs.
function HiveVisual({ p }: { p: Project }) {
  const [i, setI] = useState(0);
  const s = p.shots[i]!;
  return (
    <div>
      <div className="relative aspect-video overflow-hidden border border-line bg-ivory shadow-[10px_10px_0_var(--deep)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>
      <div role="tablist" aria-label="Report pages" className="mt-3 grid grid-cols-2 gap-x-4 sm:flex sm:flex-wrap">
        {p.shots.map((x, k) => (
          <button
            type="button"
            key={x.label}
            role="tab"
            aria-selected={k === i}
            onPointerEnter={(e) => e.pointerType === "mouse" && setI(k)}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (k + (e.key === "ArrowRight" ? 1 : p.shots.length - 1)) % p.shots.length;
                setI(n);
                (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
              }
            }}
            className={
              "label flex min-h-11 items-center border-b-2 text-left text-[0.6rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine " +
              (k === i ? "border-wine text-wine" : "border-transparent text-muted-foreground hover:text-deep")
            }
          >
            {k === i ? "● " : ""}
            {x.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// 05 — one executive image with two layered peeks.
function SupplyVisual({ p }: { p: Project }) {
  const [main] = p.shots;
  const peeks = p.shots.filter((s) => /sales|orders/i.test(s.label)).slice(0, 2);
  return (
    <div className="relative md:pr-8 md:pt-8">
      {peeks.map((s, k) => (
        <img
          key={s.label}
          src={s.src}
          alt=""
          aria-hidden
          loading="lazy"
          className={
            "absolute hidden w-[55%] border border-line opacity-60 transition-transform duration-700 ease-out-lux md:block " +
            (k === 0 ? "right-0 top-0 group-hover:-translate-y-2" : "right-5 top-5 group-hover:-translate-y-1")
          }
        />
      ))}
      <div className="relative">
        <Dash s={main!} className="shadow-[10px_10px_0_var(--deep)]" />
      </div>
      <p className="label mt-3 text-[0.55rem] text-muted-foreground">Executive · Sales &amp; profit · Orders &amp; market · Customers</p>
    </div>
  );
}

// 03 — Canyon flagship: one strong viewport.
function Flagship({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const [main, ...rest] = p.shots;
  return (
    <article id={`project-${p.index}`} data-project={p.index} ref={ref} className="scroll-mt-20 bg-deep px-5 py-20 text-paper md:px-10 md:py-28">
      <button type="button" onClick={() => onOpen(p)} data-cursor="view" aria-label={`${p.client} — view case study`} className="group mx-auto grid w-full max-w-[1500px] gap-10 text-left md:grid-cols-12 md:items-center">
        <div className="relative md:col-span-8">
          <Dash s={main!} className="border-nude/20" />
          <motion.div style={{ y }} className="relative -mt-8 ml-6 hidden gap-3 md:flex">
            {rest.map((s) => (
              <figure key={s.label} className="w-[26%] transition-transform duration-700 ease-out-lux group-hover:-translate-y-2">
                <img src={s.src} alt={s.alt} loading="lazy" className="block w-full border border-nude/30" />
                <figcaption className="label mt-2 text-[0.5rem] text-nude/70">{s.label}</figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
        <div className="md:col-span-4">
          <Head p={p} dark big />
          <p className="label mt-5 text-[0.6rem] text-rose">{tools(p)}</p>
          <p className="mt-4 text-sm leading-relaxed text-nude/80">{short(p.description)}</p>
          <p className="mt-4 font-display text-lg italic text-nude">Explore sales, profitability, products, customers and returns.</p>
          <Cta dark />
          <p className="label mt-3 text-[0.5rem] text-nude/60">Simulated dataset</p>
        </div>
      </button>
    </article>
  );
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [p1, p2, p3, p4, p5] = projects;
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

        <div className="grid gap-16 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          {p1 && <Card p={p1} onOpen={setOpen} wide />}
          {p2 && (
            <div className="md:col-span-5 md:pt-32">
              <Card p={p2} onOpen={setOpen} />
            </div>
          )}
        </div>
      </div>

      {p3 && <Flagship p={p3} onOpen={setOpen} />}

      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        {p4 && (
          <div className="md:col-span-6">
            <Card p={p4} onOpen={setOpen} wide extra={<HiveVisual p={p4} />} />
          </div>
        )}
        {p5 && (
          <div className="md:col-span-6 md:pt-16">
            <Card p={p5} onOpen={setOpen} wide extra={<SupplyVisual p={p5} />} />
          </div>
        )}
      </div>

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
