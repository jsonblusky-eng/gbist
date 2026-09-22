import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/site.js";
import { LOGO_MAIN } from "../data/assets.js";

/** Sticky top navigation with scroll shadow and accessible mobile menu. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "border-b border-line shadow-card" : "border-b border-transparent"
      }`}
    >
      <div className="container-content flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center" aria-label="GBIST home">
          <img src={LOGO_MAIN} alt="GBIST — Gulzar Begum Institute of Science & Technology" className="h-12 w-auto md:h-14" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-teal-tint text-teal" : "text-charcoal hover:bg-ice hover:text-navy"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admissions"
            className="btn-primary ml-2 !rounded-btn px-5 py-2.5 text-sm font-semibold shadow-card"
          >
            Apply / Admissions
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-navy lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-content flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? "bg-teal-tint text-teal" : "text-charcoal hover:bg-ice"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/admissions" className="btn-primary mt-2 justify-center">
              Apply / Admissions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
