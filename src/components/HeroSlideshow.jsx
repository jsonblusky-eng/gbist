import { useEffect, useState } from "react";
import { HERO_SLIDES } from "../data/assets.js";

/**
 * Full-bleed background slideshow — images crossfade every few seconds
 * while the active image slowly zooms. A dark wash keeps the white hero
 * text readable without hiding the photos.
 */
export default function HeroSlideshow({ interval = 6000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`hero-zoom absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark wash — black backdrop, images phir bhi saaf dikhein */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/10" />
    </div>
  );
}
