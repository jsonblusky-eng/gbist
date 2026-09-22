import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { faculty } from "../data/faculty.js";
import PageHero from "../components/PageHero.jsx";
import FacultyCard from "../components/FacultyCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

export default function Faculty() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setPageMeta(
      "Faculty",
      "Faculty profiles at Gulzar Begum Institute of Science & Technology, Chakwal.",
    );
  }, []);

  const filtered = faculty.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      (m.department || "").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Faculty"
        title="Our Faculty"
        description="Meet the experienced educators and healthcare professionals teaching at GBIST."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Faculty" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content">
          {/* Search */}
          <Reveal className="mx-auto mb-10 max-w-md">
            <label htmlFor="faculty-search" className="sr-only">
              Search faculty by name or department
            </label>
            <div className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="faculty-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or department..."
                className="field-input !pl-10"
              />
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No faculty found"
              text={`No results for "${query}". Try a different name or department.`}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((m, i) => (
                <Reveal key={m.id} delay={i * 70}>
                  <FacultyCard member={m} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Join Our Academic Team?"
        text="We welcome qualified educators — send your inquiries through the contact page."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "About GBIST", to: "/about" }}
      />
    </>
  );
}
