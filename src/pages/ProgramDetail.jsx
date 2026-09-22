import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, ListChecks, Briefcase, ArrowLeft, CalendarCheck } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { getProgramBySlug, programs } from "../data/programs.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import CTASection from "../components/CTASection.jsx";

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = getProgramBySlug(slug);
  const others = programs.filter((p) => p.slug !== slug);

  useEffect(() => {
    if (program) {
      setPageMeta(program.title, `${program.title} program at GBIST Chakwal — program details, duration, eligibility and admission information.`);
    }
  }, [program]);

  if (!program) {
    return (
      <section className="py-20">
        <div className="container-content">
          <EmptyState
            title="Program not found"
            text="The program you are looking for does not exist or has been renamed."
          >
            <Link to="/programs" className="btn-secondary mt-6">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Programs
            </Link>
          </EmptyState>
        </div>
      </section>
    );
  }

  const facts = [
    { icon: Clock, label: "Duration", value: program.duration },
    { icon: CalendarCheck, label: "Admission Status", value: "Admissions open — Fall 2026 intake. Apply before September 30, 2026." },
  ];

  return (
    <>
      <PageHero
        eyebrow={program.category}
        title={program.title}
        description={program.shortDescription}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Programs", to: "/programs" },
          { label: program.title },
        ]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Main column */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-navy">Program Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {program.overview}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-navy">
                <ListChecks size={20} className="text-teal" aria-hidden="true" />
                Curriculum
              </h2>
              {program.curriculum ? (
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {program.curriculum.map((subject) => (
                    <li
                      key={subject}
                      className="flex items-start gap-2.5 rounded-card border border-line bg-white p-3.5 text-sm text-charcoal"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      {subject}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-card border border-dashed border-line bg-ice p-5 text-sm leading-relaxed text-muted">
                  Curriculum details will be updated soon.
                </p>
              )}
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-navy">
                <Briefcase size={20} className="text-teal" aria-hidden="true" />
                Career Opportunities
              </h2>
              {program.careers ? (
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {program.careers.map((career) => (
                    <li
                      key={career}
                      className="flex items-start gap-2.5 rounded-card border border-line bg-white p-3.5 text-sm text-charcoal"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      {career}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-card border border-dashed border-line bg-ice p-5 text-sm leading-relaxed text-muted">
                  Career pathways will be updated soon.
                </p>
              )}
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Reveal>
              <div className="card sticky top-28 space-y-5 p-6">
                <h2 className="font-heading text-base font-semibold text-navy">Program Facts</h2>
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                      <f.icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal">{f.value}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-line pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Eligibility</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal">{program.eligibility}</p>
                </div>

                <Link to="/admissions" className="btn-primary w-full">
                  Admission Information
                </Link>
                <Link to="/contact" className="btn-secondary w-full">
                  Ask a Question
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Other programs */}
        <div className="container-content mt-16">
          <h2 className="font-heading text-xl font-semibold text-navy">Other Programs</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} to={`/programs/${p.slug}`} className="card card-hover group flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-tint text-teal font-heading font-bold">
                  {p.title.charAt(0)}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-navy group-hover:text-teal">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Interested in ${program.title}?`}
        text="Admissions for the Fall 2026 intake are open. Apply before September 30, 2026."
      />
    </>
  );
}
