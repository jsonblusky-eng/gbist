import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Eye,
  HeartHandshake,
  BookOpen,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";
import { setPageMeta } from "../utils.js";
import { site } from "../data/site.js";
import { IMAGES } from "../data/assets.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

const values = [
  {
    icon: HeartHandshake,
    title: "Integrity",
    text: "We uphold honesty and transparency in every aspect of teaching, assessment and administration.",
  },
  {
    icon: Users,
    title: "Student-Centered Learning",
    text: "Small groups and supervised practice ensure every student gets the attention they need to succeed.",
  },
  {
    icon: BookOpen,
    title: "Academic Honesty",
    text: "We maintain rigorous, fair academic standards aligned with PMF guidelines and requirements.",
  },
  {
    icon: Building2,
    title: "Professionalism",
    text: "Discipline, punctuality and professional conduct are modeled and expected from day one.",
  },
];

export default function About() {
  useEffect(() => {
    setPageMeta(
      "About Us",
      "Learn about Gulzar Begum Institute of Science & Technology, Chakwal — its mission, vision, values and educational approach.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Gulzar Begum Institute of Science & Technology"
        description="An allied-health institute in Chakwal, Punjab, focused on practical, career-oriented healthcare education."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* About GBIST */}
      <section className="py-14 md:py-18">
        <div className="container-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src={IMAGES.about}
                alt="GBIST institute building"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading align="left" eyebrow="Who We Are" title="About GBIST" />              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                Gulzar Begum Institute of Science &amp; Technology (GBIST) is an allied-health
                institute located in {site.city}, {site.region}. The institute offers programs in
                allied-health disciplines for students seeking practical, career-focused education
                that leads directly to employment in the healthcare sector.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                Founded with the mission of serving students in Chakwal and surrounding areas,
                GBIST combines structured classroom instruction with supervised laboratory and
                clinical training, preparing graduates for supportive professional roles in
                hospitals, pharmacies and diagnostic laboratories.
              </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-ice py-14 md:py-18">
        <div className="container-content grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Compass size={22} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-xl font-semibold text-navy">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                To provide accessible, practical and career-oriented allied-health education that
                equips students with the skills, discipline and confidence to serve their
                communities and succeed in the healthcare workplace.
              </p>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="card h-full p-7">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal text-white">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-xl font-semibold text-navy">Our Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                To be recognized as a leading allied-health institute in the region — known for
                quality training, ethical values and graduates who make a real difference in
                healthcare delivery.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Our Values"
            title="What Guides Us"
            text="The principles that shape teaching, learning and campus life at GBIST."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <article className="card card-hover h-full p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                    <v.icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Educational approach */}
      <section className="bg-ice py-14 md:py-18">
        <div className="container-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Educational Approach"
              title="Learning That Prepares You for Work"
            />
            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              Our educational approach blends theory with practice so students graduate ready for
              the workplace. Every program follows the same proven structure:
            </p>
            <ul className="mt-6 space-y-3 text-sm text-charcoal">
              {[
                "Structured classroom instruction",
                "Supervised practical and laboratory training",
                "Guidance toward professional healthcare roles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src={IMAGES.classroom}
                alt="Classroom learning at GBIST"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facilities placeholder */}
      <section className="py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Facilities"
            title="Campus Facilities"
            text="Purpose-built spaces that support practical, hands-on learning."
          />
          <Reveal className="mt-10">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Science Laboratory",
                  text: "A newly equipped laboratory for hematology, clinical chemistry and microbiology sessions.",
                },
                {
                  title: "Classrooms",
                  text: "Well-lit classrooms with modern teaching aids for comfortable, focused learning.",
                },
                {
                  title: "Student Common Area",
                  text: "Dedicated spaces for study, group work and breaks between sessions.",
                },
              ].map((f) => (
                <article key={f.title} className="card card-hover p-6">
                  <Building2 size={26} className="text-teal" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-base font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want to Learn More About GBIST?"
        text="Explore our programs or contact us — we're happy to answer your questions."
      />
    </>
  );
}
