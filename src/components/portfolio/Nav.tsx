import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { scrollToId } from "@/lib/smooth-scroll";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux " +
        (scrolled ? "border-b border-line bg-paper/80 py-3 backdrop-blur-md" : "py-6")
      }
    >
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-wine"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10">
        <a href="#top" onClick={go("top")} className="group flex items-center gap-3">
          <span className="display flex h-9 w-9 items-center justify-center rounded-full bg-wine text-lg text-paper transition-transform duration-700 ease-lux group-hover:rotate-[360deg]">
            CA
          </span>
          <span className="label hidden text-ink sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={go(n.id)}
              className="label relative py-1 text-muted-foreground transition-colors hover:text-wine"
            >
              {n.label}
              {active === n.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-wine"
                />
              )}
            </a>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="label border border-wine px-4 py-2.5 text-wine transition-colors duration-500 hover:bg-wine hover:text-paper"
          >
            Let's connect ↗
          </a>
        </nav>

        <button
          className="label text-wine md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-x-0 top-0 -z-10 flex h-svh flex-col justify-center gap-4 bg-deep px-6 md:hidden"
          aria-label="Mobile"
        >
          {navItems.map((n, i) => (
            <span key={n.id} className="mask-line">
              <motion.a
                href={`#${n.id}`}
                onClick={go(n.id)}
                className="display block text-7xl text-paper"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="label mr-4 align-middle text-rose">0{i + 1}</span>
                {i % 2 ? <em>{n.label}</em> : n.label}
              </motion.a>
            </span>
          ))}
          <div className="label mt-10 flex flex-col gap-2 border-t border-nude/20 pt-6 text-[0.6rem] text-nude/70">
            <span>{profile.name} — {profile.role}</span>
            <a href={`mailto:${profile.email}`} className="text-nude">{profile.email}</a>
            <span className="flex gap-6">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-nude">LinkedIn ↗</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-nude">GitHub ↗</a>
            </span>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
