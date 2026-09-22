import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { HERO_IMAGES } from "../data/assets.js";

/** Strong navy admissions CTA band used on multiple pages. */
export default function CTASection({
  title = "Ready to Begin Your Healthcare Education Journey?",
  text = "Explore GBIST programs and admission information, or reach out to us with your questions.",
  primary = { label: "Admission Information", to: "/admissions" },
  secondary = { label: "Contact Us", to: "/contact" },
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Subtle backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={HERO_IMAGES.default}
          alt=""
          className="kenburns h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-teal-dark/20" />
      </div>

      <Reveal className="container-content relative flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between lg:py-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={primary.to} className="btn-primary">
            {primary.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to={secondary.to} className="btn-ghost-light">
            {secondary.label}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
