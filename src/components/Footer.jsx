import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { site, navLinks } from "../data/site.js";
import { programs } from "../data/programs.js";
import { LOGO_WHITE } from "../data/assets.js";

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "Twitter", href: site.social.twitter, Icon: Twitter },
  { label: "YouTube", href: site.social.youtube, Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Brand + description */}
        <div>
          <img src={LOGO_WHITE} alt={site.name} className="mb-4 h-14 w-auto" />
          <p className="text-sm leading-relaxed text-white/70">
            An allied-health institute in {site.city}, {site.region}, focused on practical,
            career-oriented education for future healthcare professionals.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={`${label} — GBIST on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-teal"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50">{site.socialNote}</p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/70 transition-colors hover:text-teal-tint">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Programs */}
        <nav aria-label="Footer programs">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Programs
          </h3>
          <ul className="space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs/${p.slug}`} className="text-white/70 transition-colors hover:text-teal-tint">
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/admissions" className="text-white/70 transition-colors hover:text-teal-tint">
                Admissions Information
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-teal-tint" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-teal-tint" aria-hidden="true" />
              <span>{site.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-teal-tint" aria-hidden="true" />
              <span>{site.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}, {site.city}. All rights reserved.
          </p>            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/contact" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
