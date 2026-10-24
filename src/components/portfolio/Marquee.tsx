import { useRef } from "react";
import { marqueeWords } from "@/data/portfolio";

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const setRate = (r: number) => {
    track.current?.getAnimations().forEach((a) => (a.playbackRate = r));
  };
  const row = [...marqueeWords, ...marqueeWords];

  return (
    <div
      className="overflow-hidden border-y border-line py-6 md:py-8"
      onPointerEnter={() => setRate(0.25)}
      onPointerLeave={() => setRate(1)}
      aria-label={marqueeWords.join(", ")}
    >
      <div ref={track} className="flex w-max" style={{ animation: "marquee 60s linear infinite" }} aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className={"display px-6 text-6xl md:px-10 md:text-8xl " + (i % 2 ? "text-outline-wine" : "text-wine")}>
                  {i % 2 ? w : <em>{w}</em>}
                </span>
                <span className="text-2xl text-wine">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
