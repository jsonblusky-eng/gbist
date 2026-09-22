import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getHeroImage } from "../data/assets.js";

/**
 * Page hero banner used at the top of inner pages.
 * Navy background with a photo backdrop, dark gradient overlay for
 * text contrast, plus staggered rise-in entrance animation.
 */
export default function PageHero({ eyebrow, title, description, breadcrumbs = [] }) {
  const bgImage = getHeroImage(eyebrow);

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Background image + overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={bgImage}
          alt=""
          className="kenburns h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-teal-dark/25" />
      </div>

      <div className="container-content relative py-14 md:py-20">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="animate-rise mb-4"
            style={{ animationDelay: "0ms" }}
          >
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.to || crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p
            className="animate-rise mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-tint"
            style={{ animationDelay: "80ms" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-rise max-w-3xl font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]"
          style={{ animationDelay: "160ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-rise mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
