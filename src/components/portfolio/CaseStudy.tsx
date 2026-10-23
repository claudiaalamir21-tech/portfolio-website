import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";
import { lockScroll, prefersReducedMotion } from "@/lib/smooth-scroll";

const ease = [0.76, 0, 0.24, 1] as const;

// Internal case-study panel. Shows only what the real project supports.
export function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === "Tab" && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", key);
      prev?.focus();
    };
  }, []);

  return (
    <motion.div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.client} case study`}
      className="fixed inset-0 z-[80] overflow-y-auto bg-paper"
      data-lenis-prevent
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: prefersReducedMotion() ? 0 : 0.6, ease }}
    >
      <div className="mx-auto max-w-[1300px] px-5 pb-24 pt-8 md:px-10">
        <div className="label flex items-center justify-between border-b border-line pb-5 text-wine">
          <span>Case study / {p.index} — 005</span>
          <button onClick={onClose} className="link-underline min-h-11 pb-1" autoFocus>
            Close ✕
          </button>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="label text-wine">{p.category}</span>
            <h2 className="display mt-5 text-[clamp(3.5rem,8vw,8rem)] text-deep">{p.client}</h2>
            <p className="mt-4 font-display text-3xl italic text-wine">{p.title}</p>
          </div>
          <div className="md:col-span-4 md:self-end">
            <p className="text-base leading-relaxed text-muted-foreground">{p.description}</p>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          {p.meta.map((m) => (
            <div key={m.label}>
              <dt className="label text-[0.6rem] text-wine">{m.label}</dt>
              <dd className="mt-1 text-sm text-ink">{m.value}</dd>
            </div>
          ))}
          <div>
            <dt className="label text-[0.6rem] text-wine">Tools</dt>
            <dd className="mt-1 text-sm text-ink">{p.tags.join(" · ")}</dd>
          </div>
        </dl>

        {p.metrics && (
          <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-6">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dd className="display text-4xl text-deep">{m.value}</dd>
                <dt className="label mt-1 text-[0.55rem] text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {p.findings && (
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {p.findings.map((f) => (
              <li key={f} className="flex gap-3 border-t border-line pt-4 text-base text-ink">
                <span className="text-wine">✦</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {p.index === "05" ? (
          <div className="mt-14">
            <p className="label mb-4 hidden text-[0.6rem] text-wine md:block">Scroll sideways to browse all {p.shots.length} pages →</p>
            <div className="flex flex-col gap-10 md:-mx-10 md:flex-row md:gap-8 md:overflow-x-auto md:px-10 md:pb-6 md:snap-x md:snap-mandatory" data-cursor="drag" tabIndex={0} aria-label="Report pages gallery">
              {p.shots.map((s, i) => (
                <figure key={s.label} className="md:w-[62%] md:shrink-0 md:snap-start">
                  <div className="border border-line bg-ivory p-3 md:p-4">
                    <img src={s.src} alt={s.alt} width={s.w} height={s.h} className="block h-auto w-full" loading="lazy" />
                  </div>
                  <figcaption className="label mt-4 text-[0.6rem] text-muted-foreground">
                    Fig. {p.index}.{i + 1} — {s.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
        <div className="mt-14 space-y-14">
          {p.shots.map((s, i) => (
            <figure key={s.label}>
              <div className="border border-line bg-ivory p-3 shadow-[16px_16px_0_var(--nude)] md:p-5">
                <img src={s.src} alt={s.alt} width={s.w} height={s.h} className="block h-auto w-full" loading="lazy" />
              </div>
              <figcaption className="label mt-5 flex justify-between text-[0.6rem] text-muted-foreground">
                <span>
                  Fig. {p.index}.{i + 1} — {s.label}
                </span>
                <span>From the repository</span>
              </figcaption>
            </figure>
          ))}
        </div>
        )}

        <p className="label mt-12 text-[0.6rem] text-muted-foreground">✦ {p.disclaimer}</p>

        <a href={p.href} target="_blank" rel="noreferrer" className="group mt-12 flex items-center justify-between border-b border-wine pb-6 text-wine">
          <span className="display text-5xl md:text-7xl">View repository</span>
          <span className="display text-5xl transition-transform duration-700 ease-out-lux group-hover:-translate-y-2 group-hover:translate-x-2 md:text-7xl">↗</span>
        </a>
      </div>
    </motion.div>
  );
}
