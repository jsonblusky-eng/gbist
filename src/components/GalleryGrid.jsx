import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Gallery grid + lightbox.
 * Lightbox supports Escape close and arrow-key navigation.
 */
export default function GalleryGrid({ images }) {
  const [openIndex, setOpenIndex] = useState(-1);

  const close = useCallback(() => setOpenIndex(-1), []);
  const step = useCallback(
    (dir) => setOpenIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (openIndex < 0) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = openIndex >= 0 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={`${img.src.slice(-40)}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image: ${img.alt}`}
            className="card card-hover group overflow-hidden p-0 text-left"
          >
            <span className="block aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </button>
        ))}
      </div>

      {openIndex >= 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-dark/90 p-4"
          onClick={close}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-h-[78vh] w-full rounded-card object-contain"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute -top-3 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-card hover:bg-ice sm:-right-3"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-card hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-card hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
