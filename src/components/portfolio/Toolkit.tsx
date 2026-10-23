import { skills } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Toolkit() {
  return (
    <section id="toolkit" className="px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="label text-wine">Toolkit</span>
            </Reveal>
            <h2 className="display mt-6 text-5xl text-deep md:text-6xl">
              <Reveal delay={0.05}>Tools I use.</Reveal>
              <Reveal delay={0.1}>
                <em className="text-wine">Skills I build.</em>
              </Reveal>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              My toolkit grows with every project. These are the methods and tools represented in my current portfolio.
            </p>
          </div>
        </div>
        <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
          {skills.map((s, i) => (
            <li key={s.name} className="group relative overflow-hidden border-b border-line">
              <span className="absolute inset-0 origin-left scale-x-0 bg-wine transition-transform duration-700 ease-lux group-hover:scale-x-100" />
              <div className="relative flex items-baseline gap-6 min-h-14 px-2 py-4 transition-colors duration-500 group-hover:text-paper md:gap-10 md:py-4">
                <span className="display w-12 text-2xl text-wine transition-all duration-500 ease-out-lux group-hover:translate-x-3 group-hover:text-rose md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display flex-1 text-2xl md:text-4xl">{s.name}</span>
                <span className="label hidden translate-y-2 text-[0.6rem] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:inline">
                  {s.note}
                </span>
                <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
