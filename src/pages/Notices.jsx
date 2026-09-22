import { useEffect } from "react";
import { Bell } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { notices } from "../data/notices.js";
import PageHero from "../components/PageHero.jsx";
import NoticeCard from "../components/NoticeCard.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

export default function Notices() {
  useEffect(() => {
    setPageMeta(
      "News & Notices",
      "News, notices and announcements from Gulzar Begum Institute of Science & Technology, Chakwal.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="News & Notices"
        title="Latest News & Announcements"
        description="The latest announcements from GBIST — admissions, academics, events and general notices."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Notices" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content">
          {notices.length === 0 ? (
            <div className="card flex flex-col items-center px-6 py-14 text-center">
              <Bell size={36} className="text-teal" aria-hidden="true" />
              <h2 className="mt-4 font-heading text-lg font-semibold text-navy">
                No notices right now
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Information will be updated soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notices.map((n, i) => (
                <Reveal key={n.slug} delay={i * 80}>
                  <NoticeCard notice={n} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Looking for Admission Updates?"
        text="Admission announcements will be published on this page as they are confirmed."
        primary={{ label: "Admission Information", to: "/admissions" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
