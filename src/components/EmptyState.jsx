import { Inbox } from "lucide-react";

/** Polished empty state used for faculty, notices, gallery etc. */
export default function EmptyState({ icon: Icon = Inbox, title, text, children }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-tint text-teal">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{text}</p>}
      {children}
    </div>
  );
}
