import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { formatDate } from "../data/notices.js";

/** Notice/announcement card. */
export default function NoticeCard({ notice }) {
  const inner = (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="chip">{notice.category}</span>
        {notice.demo && <span className="chip !bg-amber-100 !text-amber-700">{notice.demoLabel}</span>}
      </div>
      <h3 className="font-heading text-base font-semibold text-navy transition-colors group-hover:text-teal">
        {notice.title}
      </h3>
      <p className="mt-2 mb-4 flex-1 text-sm leading-relaxed text-muted">{notice.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} aria-hidden="true" />
          {formatDate(notice.date)}
        </span>
        <span className="flex items-center gap-1 font-semibold text-teal">
          Read More
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </>
  );

  return (
    <article className="card card-hover group flex flex-col p-6">
      {notice.slug ? (
        <Link to={`/notices/${notice.slug}`} className="flex h-full flex-col">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  );
}
