import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  Landmark,
  FileText,
} from "lucide-react";
import { setPageMeta } from "../utils.js";
import { site } from "../data/site.js";
import { programs } from "../data/programs.js";
import {
  additionalCharges,
  programWiseNote,
  feeIncludes,
  paymentNotes,
  feeStructures,
} from "../data/fees.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

/** 12000 -> "12,000" */
const fmt = (n) => (n ? n.toLocaleString("en-PK") : "—");

export default function Fees() {
  const [structure, setStructure] = useState("pmf");

  useEffect(() => {
    setPageMeta(
      "Fee Structure",
      "Fee structure of GBIST Chakwal — admission fee, monthly and yearly tuition fees, additional charges and payment policy.",
    );
  }, []);

  const currentStructure = feeStructures[structure];
  const programFees = currentStructure.programs;

  return (
    <>
      <PageHero
        eyebrow="Fee Structure"
        title="Fees at GBIST"
        description="Transparent fee structure — admission, monthly and yearly tuition with no hidden charges. Amounts shown are current and may be revised by the institute."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Fee Structure" }]}
      />

      {/* ---------- Program-wise fees ---------- */}
      <section className="py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Program Fees"
            title="Program-Wise Fee Table"
            text={programWiseNote}
          />
          
          {/* ---------- Structure Toggle ---------- */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-charcoal">{currentStructure.description}</span>
            <div className="inline-flex items-center p-1 rounded-lg bg-white border border-line shadow-sm">
              {Object.entries(feeStructures).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setStructure(key)}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    structure === key
                      ? "bg-teal text-white shadow-md"
                      : "text-charcoal hover:bg-teal-tint"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <Reveal className="mt-10">
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-ice text-xs uppercase tracking-wider text-muted">
                      <th scope="col" className="px-6 py-4 font-semibold">Program</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Duration</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Admission Fee</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Monthly Fee</th>
                      <th scope="col" className="px-6 py-4 font-semibold">2-Year Package</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {programs.map((p) => {
                      const fees = programFees[p.slug];
                      return (
                        <tr key={p.slug} className="transition-colors hover:bg-teal-tint/40">
                          <td className="px-6 py-4">
                            <Link
                              to={`/programs/${p.slug}`}
                              className="font-semibold text-navy transition-colors hover:text-teal"
                            >
                              {p.title}
                            </Link>
                            <span className="mt-0.5 block text-xs text-muted">{p.category}</span>
                          </td>
                          <td className="px-6 py-4 text-muted">{p.duration || "2 Years"}</td>
                          <td className="px-6 py-4 font-medium text-charcoal">Rs {fmt(fees.admissionFee)}</td>
                          <td className="px-6 py-4 font-medium text-charcoal">Rs {fmt(fees.monthlyFee)}</td>
                          <td className="px-6 py-4 font-medium text-charcoal">Rs {fmt(fees.twoYearPackage)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Additional charges ---------- */}
      <section className="py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Other Charges"
            title="Additional Charges"
            text="One-time and recurring charges beyond the core tuition fee."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalCharges.map((charge, i) => (
              <Reveal key={charge.label} delay={i * 70}>
                <article className="card card-hover h-full p-6">
                  <h3 className="font-heading text-base font-semibold text-navy">{charge.label}</h3>
                  <p className="mt-2 font-heading text-2xl font-bold text-teal">
                    Rs {fmt(charge.amount)}
                    <span className="ml-1.5 align-middle text-xs font-semibold uppercase tracking-wide text-muted">
                      {charge.frequency}
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{charge.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Includes + Payment policy ---------- */}
      <section className="bg-ice py-14 md:py-18">
        <div className="container-content grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                <CheckCircle2 size={22} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-lg font-semibold text-navy">
                What the Fee Includes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {feeIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="card h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                <Landmark size={22} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-lg font-semibold text-navy">Payment Policy</h2>
              <ul className="mt-4 space-y-2.5">
                {paymentNotes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal"
                  >
                    <CreditCard size={16} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-input bg-ice px-4 py-3 text-xs leading-relaxed text-muted">
                <FileText size={13} className="mr-1.5 inline align-[-2px]" aria-hidden="true" />
                Actual amounts {site.phone} par accounts office se confirm kar lein — ye page
                jald official fees se update hoga.
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to Enroll?"
        text="Check your eligibility and apply online — the admissions office will guide you through the rest."
        primary={{ label: "Apply Online", to: "/admissions" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
