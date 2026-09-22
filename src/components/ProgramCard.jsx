import { Link } from "react-router-dom";
import { Pill, Microscope, Activity, ArrowRight, Clock } from "lucide-react";

const icons = { pill: Pill, microscope: Microscope, activity: Activity };

/** Card used on the homepage and the programs directory. */
export default function ProgramCard({ program }) {
  const Icon = icons[program.icon] || Pill;

  return (
    <article className="card card-hover flex flex-col p-6">
      <span className="icon-pop mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-tint text-teal">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3 className="font-heading text-lg font-semibold text-navy">{program.title}</h3>
      <p className="mt-2 mb-5 flex-1 text-sm leading-relaxed text-muted">
        {program.shortDescription}
      </p>
      <p className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted/80">
        <Clock size={12} aria-hidden="true" />
        Duration: {program.duration}
      </p>
      <Link to={`/programs/${program.slug}`} className="link-more arrow-nudge mt-auto">
        Learn More
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
