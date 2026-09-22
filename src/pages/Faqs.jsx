import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { faqs } from "../data/home.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

/** Standalone FAQ page with accordion for the admissions FAQs. */
export default function Faqs() {
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    setPageMeta(
      "FAQs",
      "Frequently asked questions about GBIST Chakwal admissions, eligibility, fees and programs.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Quick answers about admissions, eligibility, fees and studying at GBIST."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "FAQs" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Have a Question?"
            text="The questions we hear most often — if your answer isn't here, contact us directly."
          />
          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 60}>
                  <div className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <span className="font-heading text-sm font-semibold text-navy md:text-base">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 text-teal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <div
                        id={`faq-panel-${i}`}
                        className="px-6 pb-5 text-sm leading-relaxed text-muted"
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Still Have Questions?"
        text="Our admissions office is happy to help — reach out by phone, email or the contact form."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "Admission Information", to: "/admissions" }}
      />
    </>
  );
}
