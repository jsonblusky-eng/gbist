/**
 * Assets module — brand lockups + online imagery.
 * Brand visuals are generated SVG lockups; photos are hotlinked from
 * Unsplash (free to use). Swap in official college photography later
 * by replacing the URLs below with local paths, e.g. "/images/hero.jpg".
 */

export const BRAND = {
  logo: null, // "/brand/gbist-logo.png" when supplied
  icon: "/brand/favicon.svg",
  logoAlt: "GBIST — Gulzar Begum Institute of Science & Technology",
};

/* ---------- Logo lockups ---------- */

const wordmarkSvg = (withTagline) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="120" viewBox="0 0 640 120">
      <circle cx="58" cy="60" r="46" fill="#12304a"/>
      <circle cx="58" cy="60" r="46" fill="none" stroke="#0e7490" stroke-width="4"/>
      <path d="M58 26c-3.5 10-9 15.5-19 19 10 3.5 15.5 9 19 19 3.5-10 9-15.5 19-19-10-3.5-15.5-9-19-19z" fill="#ffffff"/>
      <path d="M36 78h44" stroke="#0e7490" stroke-width="7" stroke-linecap="round"/>
      <text x="126" y="58" font-family="Poppins, Segoe UI, sans-serif" font-size="42" font-weight="700" fill="#12304a">GBIST</text>
      <text x="126" y="88" font-family="Inter, Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#0e7490">GULZAR BEGUM INSTITUTE</text>
      <text x="126" y="110" font-family="Inter, Segoe UI, sans-serif" font-size="13" font-weight="500" fill="#64748b">OF SCIENCE &amp; TECHNOLOGY${withTagline ? " — CHAKWAL" : ""}</text>
    </svg>`,
  )}`;

export const LOGO_MAIN = wordmarkSvg(true);
export const LOGO_COMPACT = wordmarkSvg(false);

/* White lockup for navy footer */
export const LOGO_WHITE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="120" viewBox="0 0 640 120">
    <circle cx="58" cy="60" r="46" fill="#ffffff"/>
    <circle cx="58" cy="60" r="46" fill="none" stroke="#0e7490" stroke-width="4"/>
    <path d="M58 26c-3.5 10-9 15.5-19 19 10 3.5 15.5 9 19 19 3.5-10 9-15.5 19-19-10-3.5-15.5-9-19-19z" fill="#12304a"/>
    <path d="M36 78h44" stroke="#0e7490" stroke-width="7" stroke-linecap="round"/>
    <text x="126" y="58" font-family="Poppins, Segoe UI, sans-serif" font-size="42" font-weight="700" fill="#ffffff">GBIST</text>
    <text x="126" y="88" font-family="Inter, Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#7dd3e8">GULZAR BEGUM INSTITUTE</text>
    <text x="126" y="110" font-family="Inter, Segoe UI, sans-serif" font-size="13" font-weight="500" fill="#c7d6e2">OF SCIENCE &amp; TECHNOLOGY — CHAKWAL</text>
  </svg>`,
)}`;

/* Circular emblem for compact use (splash, small UI) */
export const EMBLEM = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <circle cx="48" cy="48" r="44" fill="#12304a"/>
    <circle cx="48" cy="48" r="44" fill="none" stroke="#0e7490" stroke-width="5"/>
    <path d="M48 18c-3.5 10.5-9.5 16.5-20 20 10.5 3.5 16.5 9.5 20 20 3.5-10.5 9.5-16.5 20-20-10.5-3.5-16.5-9.5-20-20z" fill="#ffffff"/>
    <path d="M28 66h40" stroke="#0e7490" stroke-width="8" stroke-linecap="round"/>
  </svg>`,
)}`;

/* ---------- Online imagery (Unsplash) ---------- */

const img = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMAGES = {
  // Medical laboratory — pipetting work
  hero: img("photo-1576091160399-112ba8d25d1d", 1280, 960),
  // University campus building
  about: img("photo-1562774053-701939374585", 1200, 900),
  // Students studying together in class
  classroom: img("photo-1522202176988-66273c2fd55f", 1000, 700),
  // Laboratory work with microscope
  lab: img("photo-1581091226825-a6a2a5aee158", 1000, 700),
  // Healthcare professional with stethoscope
  professional: img("photo-1559839734-2b71ea197ec2", 1000, 700),
  // Faculty portraits
  faculty1: img("photo-1612349317150-e413f6a5b16d", 600, 600),
  faculty2: img("photo-1594824476967-48c8b964273f", 600, 600),
  faculty3: img("photo-1622253692010-333f2da6031d", 600, 600),
  faculty4: img("photo-1582750433449-648ed127bb54", 600, 600),
};

/* ---------- Home hero slideshow (crossfading backgrounds) ---------- */

export const HERO_SLIDES = [
  // Medical laboratory — pipetting work
  img("photo-1576091160399-112ba8d25d1d", 1600, 900),
  // Nursing students in training
  img("photo-1582719471384-894fbb16e074", 1600, 900),
  // Hospital / healthcare environment
  img("photo-1538108149393-fbbd81895907", 1600, 900),
  // Classroom learning
  img("photo-1522202176988-66273c2fd55f", 1600, 900),
];

/* ---------- Page hero backgrounds (behind a navy overlay) ---------- */

export const HERO_IMAGES = {
  home: img("photo-1498243691581-b145c3f54a5a", 1600, 900),
  about: img("photo-1607237138185-eedd9c632b0b", 1600, 900),
  programs: img("photo-1576086213369-97a306d36557", 1600, 900),
  allied: img("photo-1576086213369-97a306d36557", 1600, 900),
  admissions: img("photo-1541339907198-e08756dedf3f", 1600, 900),
  faculty: img("photo-1522202176988-66273c2fd55f", 1600, 900),
  gallery: img("photo-1498243691581-b145c3f54a5a", 1600, 900),
  news: img("photo-1540575467063-178a50c2df87", 1600, 900),
  notices: img("photo-1540575467063-178a50c2df87", 1600, 900),
  academic: img("photo-1540575467063-178a50c2df87", 1600, 900),
  events: img("photo-1540575467063-178a50c2df87", 1600, 900),
  general: img("photo-1540575467063-178a50c2df87", 1600, 900),
  contact: img("photo-1562774053-701939374585", 1600, 900),
  default: img("photo-1541339907198-e08756dedf3f", 1600, 900),
};

/** Pick a hero background based on the page eyebrow, e.g. "About Us" -> about. */
export function getHeroImage(eyebrow) {
  if (!eyebrow) return HERO_IMAGES.default;
  const key = String(eyebrow).trim().toLowerCase();
  if (HERO_IMAGES[key]) return HERO_IMAGES[key];
  return HERO_IMAGES[key.split(/[\s&]+/)[0]] || HERO_IMAGES.default;
}
