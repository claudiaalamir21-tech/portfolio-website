import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Cursor } from "@/components/portfolio/Cursor";
import { Hero } from "@/components/portfolio/Hero";
import { Insight } from "@/components/portfolio/Insight";
import { Intro } from "@/components/portfolio/Intro";
import { Marquee } from "@/components/portfolio/Marquee";
import { Nav } from "@/components/portfolio/Nav";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Toolkit } from "@/components/portfolio/Toolkit";
import { Work } from "@/components/portfolio/Work";

const title = "Claudia Al-Amir — Data Analyst Portfolio";
const description =
  "Claudia Al-Amir's data analytics portfolio featuring Excel, Power BI, SQL, Python, Tableau, business analysis, data visualization, and analytical storytelling projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain">
      <SmoothScroll />
      <Intro />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Toolkit />
        <Insight />
        <Contact />
      </main>
    </div>
  );
}
