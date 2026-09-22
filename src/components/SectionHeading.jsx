import Reveal from "./Reveal.jsx";

/** Section heading with eyebrow, title and optional intro text. */
export default function SectionHeading({ eyebrow, title, text, align = "center", light = false }) {
  const alignCls = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <Reveal className={`flex flex-col ${alignCls}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            light ? "text-teal-tint" : "text-teal"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-2xl font-bold leading-snug md:text-3xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${light ? "text-white/75" : "text-muted"}`}>
          {text}
        </p>
      )}
      <span
        aria-hidden="true"
        className={`heading-bar mt-4 ${align === "left" ? "origin-left" : "origin-center"}`}
      />
    </Reveal>
  );
}
