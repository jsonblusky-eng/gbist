import { useEffect } from "react";
import { setPageMeta } from "../utils.js";
import { programs } from "../data/programs.js";
import PageHero from "../components/PageHero.jsx";
import ProgramCard from "../components/ProgramCard.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

export default function Programs() {
  useEffect(() => {
    setPageMeta(
      "Programs",
      "Explore allied-health programs at GBIST Chakwal — Dispenser, Medical Lab Technology, Operation Theater Technology, Dental Technician, Physiotherapy Technician, and Dialysis Technician.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs & Courses"
        description="Allied-health programs offered at Gulzar Begum Institute of Science & Technology, Chakwal."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Programs" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Interested in Applying?"
        text="Admissions for the Fall 2026 intake are open — visit the admissions page to learn how to apply."
        primary={{ label: "Admission Information", to: "/admissions" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
