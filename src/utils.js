const SITE_NAME = "Gulzar Begum Institute of Science & Technology | GBIST";

/** Set document title + meta description for the current page. */
export function setPageMeta(title, description) {
  document.title = title ? `${title} | GBIST` : SITE_NAME;
  if (description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }
}

/** "Medical Lab Technology" -> "medical-lab-technology" */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
