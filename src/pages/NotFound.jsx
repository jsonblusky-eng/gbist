import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { setPageMeta } from "../utils.js";

export default function NotFound() {
  useEffect(() => {
    setPageMeta("Page Not Found", "The page you requested could not be found on the GBIST website.");
  }, []);

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <div className="container-content text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-tint text-teal">
          <Compass size={30} aria-hidden="true" />
        </span>
        <p className="font-heading text-5xl font-bold text-navy">404</p>
        <h1 className="mt-3 font-heading text-xl font-semibold text-navy">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          The page you are looking for may have been moved or renamed. Use the navigation above or
          return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/programs" className="btn-secondary">
            Explore Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
