import { useEffect, useState } from "react";
import { setPageMeta } from "../utils.js";
import { galleryCategories, galleryImages } from "../data/gallery.js";
import PageHero from "../components/PageHero.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

export default function Gallery() {
  const [active, setActive] = useState("All");

  useEffect(() => {
    setPageMeta(
      "Gallery",
      "Photo gallery of Gulzar Begum Institute of Science & Technology, Chakwal — campus, classrooms, laboratories and events.",
    );
  }, []);

  const images =
    active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Campus Gallery"
        description="Glimpses of campus life, classrooms, laboratories, students and events at GBIST."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content">
          {/* Category tabs */}
          <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
            {["All", ...galleryCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-navy text-white"
                    : "border border-line bg-white text-charcoal hover:border-teal hover:text-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          <GalleryGrid images={images} />
        </div>
      </section>

      <CTASection
        title="Want to Visit the Campus?"
        text="We'd love to show you around — contact us to schedule a visit during office hours."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "About GBIST", to: "/about" }}
      />
    </>
  );
}
