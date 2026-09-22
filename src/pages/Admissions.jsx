import { useEffect } from "react";
import {
  ClipboardList,
  FileCheck2,
  UserCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { setPageMeta } from "../utils.js";
import { admissionsSteps } from "../data/home.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import AdmissionForm from "../components/AdmissionForm.jsx";
import CTASection from "../components/CTASection.jsx";

const stepIcons = [ClipboardList, FileCheck2, UserCheck, CreditCard];

const eligibilityPoints = [
  "Matriculation (Science) or equivalent — minimum requirement for all programs",
  "Minimum marks: 50% or above in Matriculation",
  "For PMF programs: Bio Science (Biology) in Matric is mandatory",
  "For Federal Board programs: Bio Science is NOT mandatory",
  "Minimum age: 15 years at the time of admission",
  "Both male and female candidates can apply",
  "Final eligibility is confirmed at the time of admission after document verification",
];

export default function Admissions() {
  useEffect(() => {
    setPageMeta(
      "Admissions",
      "Apply online to GBIST Chakwal — admission process, eligibility, required documents and the online application form with document uploads.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions at GBIST"
        description="Your path to healthcare education at Gulzar Begum Institute of Science & Technology. Applications for the Fall 2026 intake are now open."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Admissions" }]}
      />

      {/* Process steps */}
      <section className="py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="How to Apply"
            title="Admission Process"
            text="Four simple steps from application to enrollment."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <Reveal key={step.title} delay={i * 80}>
                  <li className="card card-hover relative h-full p-6">
                    <span className="absolute -top-3 left-6 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">
                      Step {i + 1}
                    </span>
                    <span className="icon-pop mb-4 mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-base font-semibold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Eligibility + Application form — side by side */}
      <section className="bg-ice py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Apply Online"
            title="Check Eligibility & Apply"
            text="Requirements left, application form right — fill it in and upload your documents."
          />
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
            {/* Who can apply — sticky sidebar */}
            <Reveal className="lg:sticky lg:top-24 lg:col-span-2">
              <article className="card p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                  <UserCheck size={22} aria-hidden="true" />
                </span>
                <h2 className="font-heading text-lg font-semibold text-navy">Who Can Apply?</h2>
                <ul className="mt-4 space-y-3">
                  {eligibilityPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal"
                    >
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-input bg-ice px-4 py-3 text-xs leading-relaxed text-muted">
                  Documents needed: Matric certificates, CNIC / B-Form, Father's CNIC,
                  domicile certificate, passport-size photographs and a character certificate — upload all six with your form.
                </div>
              </article>
            </Reveal>

            {/* Online admission form */}
            <Reveal delay={100} className="lg:col-span-3">
              <AdmissionForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help With Your Application?"
        text="Contact us for guidance — our admissions office is open Monday to Saturday, 8:00 AM to 4:00 PM."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "View FAQs", to: "/faqs" }}
      />
    </>
  );
}
