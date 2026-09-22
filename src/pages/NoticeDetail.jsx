import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { getNoticeBySlug, formatDate } from "../data/notices.js";
import PageHero from "../components/PageHero.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

export default function NoticeDetail() {
  const { slug } = useParams();
  const notice = getNoticeBySlug(slug);

  useEffect(() => {
    if (notice) setPageMeta(notice.title, notice.excerpt);
  }, [notice]);

  if (!notice) {
    return (
      <section className="py-20">
        <div className="container-content">
          <EmptyState
            icon={CalendarDays}
            title="Notice not found"
            text="This notice may have been removed or the link is incorrect."
          >
            <Link to="/notices" className="btn-secondary mt-6">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Notices
            </Link>
          </EmptyState>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={notice.demo ? notice.demoLabel : notice.category}
        title={notice.title}
        description={notice.excerpt}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Notices", to: "/notices" },
          { label: notice.title },
        ]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="chip">{notice.category}</span>
              {notice.demo && (
                <span className="chip !bg-amber-100 !text-amber-700">{notice.demoLabel}</span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} aria-hidden="true" />
                {formatDate(notice.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} aria-hidden="true" />
                GBIST Notice
              </span>
            </div>

            <article className="card p-7 md:p-9">
              <p className="text-sm leading-relaxed text-charcoal md:text-base">{notice.body}</p>
            </article>

            <Link to="/notices" className="link-more mt-8">
              <ArrowLeft size={15} aria-hidden="true" />
              Back to All Notices
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Questions About This Notice?"
        text="Reach out through the contact page — we're happy to help."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "All Notices", to: "/notices" }}
      />
    </>
  );
}
