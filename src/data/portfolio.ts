const asset = (filename: string) => ({ url: `${import.meta.env.BASE_URL}assets/${filename}` });
const staplesShot = asset("staples-dashboard.png");
const h2hShot = asset("h2h-dashboard.png");
const cExec = asset("canyon-executive-overview.jpg");
const cProd = asset("canyon-product-analysis.jpg");
const cCust = asset("canyon-customer-analysis.jpg");
const cRec = asset("canyon-recommendations.jpg");
const hLanding = asset("01-landing-page.jpg");
const hCamp = asset("hive-02-campaign-analysis.jpg");
const hProd = asset("hive-03-product-analysis.jpg");
const hCust = asset("hive-04-customer-analysis.jpg");
const hRec = asset("hive-05-business-recommendations.jpg");
const sLanding = asset("landing-page.jpg");
const sExec = asset("sc-executive-overview.jpg");
const sSales = asset("sc-sales-profit-performance.jpg");
const sProd = asset("sc-product-analysis.jpg");
const sOrd = asset("sc-orders-market.jpg");
const sCust = asset("sc-customer-analysis.jpg");
const sRec = asset("sc-recommendations.jpg");

// Single source of truth for Claudia's real portfolio content.
// Every fact below comes from the project repositories / the owner's brief. Do not add invented claims.

export const profile = {
  name: "Claudia Al-Amir",
  first: "Claudia",
  last: "Al-Amir",
  role: "Data Analyst",
  intro:
    "I turn data into clear insights, thoughtful visualizations, and practical business recommendations using Excel, Power BI, SQL, Python, and Tableau.",
  email: "claudiaalamir21@gmail.com",
  linkedin: "https://www.linkedin.com/in/claudia-al-amir-131199424",
  github: "https://github.com/claudiaalamir21-tech",
} as const;

export type ProjectArtKind = "cells" | "lines" | "dashboard";
export type Layout = "single" | "spread" | "index" | "sequence";

export interface Shot {
  src: string;
  label: string;
  alt: string;
  w: number;
  h: number;
}

export interface Project {
  index: string;
  client: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  meta: { label: string; value: string }[];
  metrics?: { label: string; value: string }[];
  findings?: string[];
  disclaimer: string;
  href: string;
  art: ProjectArtKind;
  layout: Layout;
  shots: Shot[];
}

const repo = "https://github.com/claudiaalamir21-tech/";

export const projects: Project[] = [
  {
    index: "01",
    client: "Staples Inc.",
    title: "Sales Performance Analysis",
    category: "Excel · Business analysis",
    description:
      "An Excel analysis of retail performance from 2014–2017, covering sales, profitability, customers, products, discounting, geography and returns.",
    tags: ["Excel", "PowerPoint"],
    meta: [
      { label: "Period", value: "2014–2017" },
      { label: "Tools", value: "Excel · PowerPoint" },
      { label: "Output", value: "Executive dashboard" },
    ],
    metrics: [
      { label: "Total sales", value: "$2.30M" },
      { label: "Total profit", value: "$286K" },
      { label: "Profit margin", value: "12.47%" },
      { label: "Orders", value: "5,009" },
      { label: "Customers", value: "793" },
      { label: "Return rate", value: "5.91%" },
    ],
    disclaimer: "Uses simulated/public retail data. Staples branding is illustrative only — not affiliated with Staples.",
    href: repo + "Staples-Inc--Sales-Perfomance-Analysis-By-Excel",
    art: "cells",
    layout: "single",
    shots: [{ src: staplesShot.url, label: "Dashboard", alt: "Staples executive retail performance dashboard built in Excel", w: 1600, h: 900 }],
  },
  {
    index: "02",
    client: "H2H Sales",
    title: "Sales Performance Analysis",
    category: "Excel · Sales performance",
    description:
      "An Excel analysis of sales from May 2011 to May 2014: revenue, customer activity, product contribution, order outcomes, markets and sales representatives.",
    tags: ["Excel", "PowerPoint"],
    meta: [
      { label: "Period", value: "May 2011–May 2014" },
      { label: "Tools", value: "Excel · PowerPoint" },
      { label: "Output", value: "Dashboard + report" },
    ],
    metrics: [
      { label: "Total sales", value: "$34.15M" },
      { label: "Net sales", value: "$30.31M" },
      { label: "Orders", value: "1,465" },
      { label: "Units sold", value: "85,866" },
      { label: "Customers", value: "294" },
      { label: "Avg. order value", value: "$23.3K" },
    ],
    findings: [
      "303 of 1,465 orders (≈20.7%) were Cancelled, Rejected or Backordered.",
      "February and April 2014 show unusually low recorded sales and need data validation.",
    ],
    disclaimer: "Based on simulated business data.",
    href: repo + "H2H-sales-analysis-by-excel",
    art: "lines",
    layout: "single",
    shots: [{ src: h2hShot.url, label: "Dashboard", alt: "H2H sales performance dashboard built in Excel", w: 1291, h: 562 }],
  },
  {
    index: "03",
    client: "Canyon Bikes",
    title: "Executive Sales Performance Analysis",
    category: "Power BI · Business intelligence",
    description:
      "An interactive multi-page Power BI report on sales, profitability, product performance, customer behavior and returns.",
    tags: ["Power BI", "Power Query", "DAX"],
    meta: [
      { label: "Type", value: "Interactive BI report" },
      { label: "Tools", value: "Power BI · Power Query · DAX" },
      { label: "Data", value: "Simulated business data" },
    ],
    findings: [
      "Mountain 200 was a strong-performing product line.",
      "Some high-volume products also recorded high returns.",
      "Customer analysis separates active and inactive customers.",
      "Cross-selling opportunities were identified.",
    ],
    disclaimer: "Based on a simulated business dataset.",
    href: repo + "Canyon-sales-performance-analysis-pbi",
    art: "dashboard",
    layout: "spread",
    shots: [
      { src: cExec.url, label: "Executive overview", alt: "Canyon Power BI executive overview page", w: 1920, h: 1080 },
      { src: cProd.url, label: "Product analysis", alt: "Canyon Power BI product analysis page", w: 1920, h: 1080 },
      { src: cCust.url, label: "Customer analysis", alt: "Canyon Power BI customer analysis page", w: 1920, h: 1080 },
      { src: cRec.url, label: "Recommendations", alt: "Canyon Power BI recommendations page", w: 1920, h: 1080 },
    ],
  },
  {
    index: "04",
    client: "Hive Analytics",
    title: "Marketing Performance Analysis",
    category: "Power BI · Marketing analytics",
    description:
      "An interactive marketing report on campaign effectiveness, budget use, conversions, ROI and ROAS, product and discount strategy, acquisition, satisfaction, lifetime value and retention.",
    tags: ["Power BI", "Power Query", "DAX"],
    meta: [
      { label: "Type", value: "Interactive marketing report" },
      { label: "Tools", value: "Power BI · Power Query · DAX" },
      { label: "Data", value: "Simulated business data" },
    ],
    disclaimer: "Based on a simulated business dataset.",
    href: repo + "Hive-analytics-marketing-analysis",
    art: "dashboard",
    layout: "index",
    shots: [
      { src: hLanding.url, label: "Landing page", alt: "Hive Analytics Power BI report landing page", w: 640, h: 360 },
      { src: hCamp.url, label: "Campaign", alt: "Hive Analytics campaign analysis page", w: 640, h: 360 },
      { src: hProd.url, label: "Product", alt: "Hive Analytics product analysis page", w: 640, h: 360 },
      { src: hCust.url, label: "Customer", alt: "Hive Analytics customer analysis page", w: 640, h: 360 },
      { src: hRec.url, label: "Recommendations", alt: "Hive Analytics business recommendations page", w: 640, h: 360 },
    ],
  },
  {
    index: "05",
    client: "Supply Chain",
    title: "Supply Chain Performance Analysis",
    category: "Power BI · Team leader · Collaborative",
    description:
      "A collaborative Power BI report on delivery reliability, on-time delivery, shipping, orders, markets, sales, profitability, products, customers and pending orders. Claudia led the team and coordinated the report pages.",
    tags: ["Power BI", "Power Query", "DAX"],
    meta: [
      { label: "Role", value: "Team leader" },
      { label: "Tools", value: "Power BI · Power Query · DAX" },
      { label: "Theme", value: "Amazon-inspired visuals" },
    ],
    disclaimer: "Independent collaborative project with an Amazon-inspired visual theme. Not affiliated with Amazon.",
    href: repo + "Amazon-Supply-chain-performance-Analysis",
    art: "dashboard",
    layout: "sequence",
    shots: [
      { src: sLanding.url, label: "Landing page", alt: "Amazon-inspired Supply Chain Power BI report landing page", w: 1920, h: 1080 },
      { src: sExec.url, label: "Executive", alt: "Supply chain executive overview page", w: 1328, h: 734 },
      { src: sSales.url, label: "Sales & profit", alt: "Supply chain sales and profit page", w: 1328, h: 734 },
      { src: sProd.url, label: "Products", alt: "Supply chain product analysis page", w: 1328, h: 734 },
      { src: sOrd.url, label: "Orders & market", alt: "Supply chain orders and market page", w: 1328, h: 734 },
      { src: sCust.url, label: "Customers", alt: "Supply chain customer analysis page", w: 1328, h: 734 },
      { src: sRec.url, label: "Recommendations", alt: "Supply chain recommendations page", w: 1328, h: 734 },
    ],
  },
];

export const skills: { name: string; note: string }[] = [
  { name: "Microsoft Excel", note: "Analysis / Modeling" },
  { name: "Microsoft Power BI", note: "Business Intelligence" },
  { name: "SQL", note: "Data Querying" },
  { name: "Python", note: "Analysis / Preparation" },
  { name: "Tableau", note: "Visualization" },
  { name: "Power Query", note: "Data Transformation" },
  { name: "DAX measures", note: "Measures / Modeling" },
  { name: "Data cleaning & preparation", note: "Preparation" },
  { name: "Data visualization", note: "Communication" },
  { name: "Analytical storytelling", note: "Decision Support" },
];

export const marqueeWords = ["Excel", "Power BI", "SQL", "Python", "Tableau", "Power Query", "DAX", "Data storytelling", "Business insights"];

export const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
] as const;
