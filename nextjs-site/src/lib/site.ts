// Base-path-aware asset URL (for <img>/<video>/CSS backgrounds under the preview subpath).
export const BASE = process.env.NEXT_PUBLIC_BASE || "";
export const asset = (p: string) => `${BASE}${p}`;

export type Tool = { n: string; d: string; href: string; g: string; i: string };

// Trucking & toll toolkit. hrefs are Next routes (next/link prefixes basePath automatically).
export const TOOLS: Tool[] = [
  { n: "Toll Calculator", d: "Instant toll cost for any truck route, by axle class & corridor.", href: "/#quote", g: "linear-gradient(160deg,#FF6B62,#E0241A)", i: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>' },
  { n: "Toll Road Directory", d: "Every toll road, bridge & tunnel across North America.", href: "/tools/ports", g: "linear-gradient(160deg,#1E3A8A,#0B2D5C)", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>' },
  { n: "Distance & Toll", d: "Road distance, ETA & toll cost for any lane.", href: "/tools/distance", g: "linear-gradient(160deg,#22D3EE,#3A5FC0)", i: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { n: "Axle & Unit Converter", d: "Convert weight, distance, axle class, speed & more.", href: "/tools/converter", g: "linear-gradient(160deg,#7C3AED,#6B5BFF)", i: '<path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>' },
  { n: "Detention & Demurrage", d: "Estimate driver detention & per-diem exposure before it bites.", href: "/tools/demurrage", g: "linear-gradient(160deg,#FB923C,#E0241A)", i: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/>' },
  { n: "Fuel Surcharge (FSC)", d: "Calculate the fuel surcharge on any truck move.", href: "/tools/fsc", g: "linear-gradient(160deg,#F59E0B,#D97706)", i: '<path d="M4 22h10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18z"/><path d="M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/><path d="M7 8h4"/>' },
  { n: "CO₂ Emissions", d: "Estimate emissions for any truck route.", href: "/tools/co2", g: "linear-gradient(160deg,#34D399,#059669)", i: '<path d="M11 20A7 7 0 0 1 9.8 6.1C16 5 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-7 7H11z"/><path d="M2 21c0-3 1.85-5.36 5.5-6"/>' },
  { n: "Vehicle & Axle Specs", d: "Dimensions, weight & axle class for every truck config.", href: "/tools/containers", g: "linear-gradient(160deg,#0EA5E9,#0369A1)", i: '<rect x="3" y="7" width="18" height="12" rx="1"/><path d="M3 11h18M8 7v12M13 7v12"/>' },
  { n: "Toll Fee Glossary", d: "What every toll term means — axle class, video toll, congestion & more.", href: "/tools/accessorials", g: "linear-gradient(160deg,#8B5CF6,#6D28D9)", i: '<path d="M6 2h9l4 4v16l-2-1-2 1-2-1-2 1-2-1-3 1V2z"/><path d="M9 8h6M9 12h6M9 16h4"/>' },
  { n: "Live Toll Estimates", d: "Live stream of every route toll priced on the network.", href: "/estimates", g: "linear-gradient(160deg,#0EA5E9,#1E3A8A)", i: '<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 4-5"/>' },
];
