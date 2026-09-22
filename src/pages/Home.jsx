import { Link } from "react-router-dom";
import {
  ArrowRight,
  FlaskConical,
  Target,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  Microscope,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { setPageMeta } from "../utils.js";
import { useEffect } from "react";
import { site } from "../data/site.js";
import HeroSlideshow from "../components/HeroSlideshow.jsx";
import { programs } from "../data/programs.js";
import { whyChoose, experienceTracks } from "../data/home.js";
import { faculty } from "../data/faculty.js";
import { IMAGES, EMBLEM } from "../data/assets.js";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ProgramCard from "../components/ProgramCard.jsx";
import FacultyCard from "../components/FacultyCard.jsx";
import CTASection from "../components/CTASection.jsx";
import EmptyState from "../components/EmptyState.jsx";

const whyIcons = { flask: FlaskConical, target: Target, heart: HeartHandshake, shield: ShieldCheck };
const expIcons = { book: BookOpen, microscope: Microscope, stethoscope: Stethoscope };

export default function Home() {
  useEffect(() => {
    setPageMeta("", "Official website of Gulzar Begum Institute of Science & Technology, Chakwal. Explore programs, admissions, faculty, notices and contact information.");
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-navy-dark">
        {/* Crossfading background slideshow + light wash */}
        <HeroSlideshow />

        <div className="container-content relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy shadow-card">
              <img src={EMBLEM} alt="" aria-hidden="true" className="h-4 w-4" />
              {site.eyebrow}
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.9rem] lg:leading-[1.15]">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              {site.heroSupport}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/programs" className="btn-primary">
                Explore Programs
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/admissions" className="btn-secondary">
                Admissions
              </Link>
            </div>
          </Reveal>

          {/* Glassy contact card — sits on the hero slideshow */}
          <Reveal delay={120}>
            <div className="rounded-card border border-white/15 bg-white/10 p-6 shadow-card-hover backdrop-blur-xl md:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="chip">Allied Health</span>
                <span className="chip">Chakwal</span>
              </div>
              <h2 className="mt-4 font-heading text-xl font-bold text-white md:text-2xl">
                Practical Training, Real Skills
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Supervised laboratory sessions and classroom instruction prepare students
                for supportive roles in hospitals, pharmacies and diagnostic labs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact Us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- QUICK PROGRAMS ---------- */}
      <section className="py-16 md:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Programs"
            title="Our Allied-Health Programs"
            text="PMF-listed allied-health programs offered at GBIST, with supervised practical training in every track."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/programs" className="btn-secondary">
              See All Courses
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- ABOUT PREVIEW ---------- */}
      <section className="bg-ice py-16 md:py-20">
        <div className="container-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src={IMAGES.about}
                alt="GBIST institute building"
                loading="lazy"
                className="img-zoom aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal">About Us</p>
            <h2 className="font-heading text-2xl font-bold leading-snug text-navy md:text-3xl">
              Gulzar Begum Institute of Science &amp; Technology, Chakwal
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              GBIST is an allied-health institute in {site.city}, {site.region}, dedicated to
              preparing students for supportive professional roles in healthcare through
              practical, career-focused education.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-charcoal">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                Allied-health and medical education focus
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                Practical, career-oriented learning approach
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                Serving students in Chakwal and surrounding areas
              </li>
            </ul>
            <Link to="/about" className="link-more mt-7">
              Learn More About GBIST
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHY CHOOSE ---------- */}
      <section className="py-16 md:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Why GBIST"
            title="Why Choose GBIST"
            text="A learning environment built around practical skills, student support and professional discipline."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, i) => {
              const Icon = whyIcons[item.icon];
              return (
                <Reveal key={item.title} delay={i * 70}>
                  <article className="card card-hover h-full p-6">
                    <span className="icon-pop mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- LEARNING EXPERIENCE ---------- */}
      <section className="bg-ice py-16 md:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Learning Experience"
            title="Classroom, Laboratory & Professional Growth"
            text="Every program combines three learning tracks for a complete educational experience."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {experienceTracks.map((track, i) => {
              const Icon = expIcons[track.icon];
              const image =
                track.icon === "book"
                  ? IMAGES.classroom
                  : track.icon === "microscope"
                    ? IMAGES.lab
                    : IMAGES.professional;
              return (
                <Reveal key={track.title} delay={i * 80}>
                  <article className="card card-hover h-full overflow-hidden">
                    <img src={image} alt={track.title} loading="lazy" className="img-zoom aspect-[3/2] w-full object-cover" />
                    <div className="p-6">
                      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-tint text-teal">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-base font-semibold text-navy">{track.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{track.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FACULTY PREVIEW ---------- */}
      <section className="py-16 md:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet Our Faculty"
            text="Experienced educators dedicated to practical, career-oriented healthcare education."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.slice(0, 4).map((m, i) => (
              <Reveal key={m.id} delay={i * 70}>
                <FacultyCard member={m} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/faculty" className="btn-secondary">
              Faculty Page
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- ADMISSIONS CTA ---------- */}
      <CTASection />

      {/* ---------- CONTACT PREVIEW ---------- */}
      <section className="py-16 md:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Get in Touch"
              text="Have a question about programs or admissions? Reach out — we're happy to help."
            />
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy">Address</p>
                  <p className="mt-0.5 text-muted">{site.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <p className="mt-0.5 text-muted">{site.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy">Email</p>
                  <p className="mt-0.5 text-muted">{site.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                  <Clock size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy">Office Hours</p>
                  <p className="mt-0.5 text-muted">{site.officeHours}</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="card flex h-full min-h-72 flex-col items-center justify-center gap-3 overflow-hidden p-8 text-center">
              <MapPin size={32} className="text-teal" aria-hidden="true" />
              <h3 className="font-heading text-lg font-semibold text-navy">Location Map</h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                {site.address} — see the contact page for directions and office hours.
              </p>
              <Link to="/contact" className="link-more mt-2">
                Contact Page
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
