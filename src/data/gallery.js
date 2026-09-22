/**
 * Gallery data — categories with online images (Unsplash).
 * Replace image entries with real college photos (from /public/images/gallery)
 * once supplied. No copyrighted images are used.
 */

const img = (id, w = 800, h = 560) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const galleryCategories = [
  "Campus",
  "Classrooms",
  "Laboratories",
  "Students",
  "Events",
  "Activities",
];

export const galleryImages = [
  {
    category: "Campus",
    src: img("photo-1498243691581-b145c3f54a5a"),
    alt: "Main view of the GBIST campus",
  },
  {
    category: "Classrooms",
    src: img("photo-1524178232363-1fb2b075b655"),
    alt: "Students in a GBIST classroom session",
  },
  {
    category: "Laboratories",
    src: img("photo-1576086213369-97a306d36557"),
    alt: "GBIST science laboratory",
  },
  {
    category: "Students",
    src: img("photo-1543269865-cbf427effbad"),
    alt: "Students at the GBIST campus",
  },
  {
    category: "Events",
    src: img("photo-1540575467063-178a50c2df87"),
    alt: "An event held at GBIST",
  },
  {
    category: "Activities",
    src: img("photo-1529156069898-49953e39b3ac"),
    alt: "Co-curricular activities at GBIST",
  },
  {
    category: "Campus",
    src: img("photo-1541339907198-e08756dedf3f"),
    alt: "GBIST campus grounds",
  },
  {
    category: "Classrooms",
    src: img("photo-1517486808906-6ca8b3f04846"),
    alt: "GBIST lecture hall",
  },
  {
    category: "Laboratories",
    src: img("photo-1532187863486-abf9dbad1b69"),
    alt: "Laboratory equipment at GBIST",
  },
];
