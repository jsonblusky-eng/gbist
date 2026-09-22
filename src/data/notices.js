/**
 * Notices — dummy announcements for development.
 * Replace with official GBIST announcements when available.
 */

export const notices = [
  {
    slug: "admissions-open-fall-2026",
    title: "Admissions Open — Fall 2026 Intake",
    category: "Admissions",
    date: "2026-08-15",
    excerpt:
      "Applications are invited for admission to the Dispenser, Medical Lab Technology and Operation Theater Technology programs.",
    body: "Applications are now open for the Fall 2026 intake of the Dispenser, Medical Lab Technology and Operation Theater Technology programs. Each program has 25 seats available. Interested candidates can collect the admission form from the institute office between 8:00 AM and 4:00 PM, Monday to Saturday. The last date to submit applications is September 30, 2026. Late submissions will not be entertained. For eligibility criteria and required documents, please visit the Admissions page or contact the admissions office.",
  },
  {
    slug: "fall-2026-class-schedule",
    title: "Class Schedule for Fall 2026 Announced",
    category: "Academic",
    date: "2026-09-01",
    excerpt:
      "The class schedule for all programs for the Fall 2026 semester has been published.",
    body: "The class schedule for the Fall 2026 semester is now available for all programs. Classes will commence from October 12, 2026. Students are advised to collect their timetables from the administration office and ensure attendance from the first day, as per institute policy. Students with timetable clashes should report to the academic office within the first week so adjustments can be arranged.",
  },
  {
    slug: "practical-training-schedule",
    title: "Practical Training Schedule — Semester I",
    category: "Academic",
    date: "2026-09-10",
    excerpt:
      "The laboratory practical training schedule for Semester I students has been issued.",
    body: "The practical training schedule for Semester I students of all programs has been issued. Laboratory sessions will run in small supervised groups to ensure hands-on learning. Students must bring their lab coats and follow all laboratory safety rules. Attendance in practical sessions is mandatory and counted toward the final internal assessment.",
  },
  {
    slug: "new-science-laboratory",
    title: "New Science Laboratory Inaugurated",
    category: "Events",
    date: "2026-07-20",
    excerpt:
      "GBIST has inaugurated a newly equipped science laboratory to strengthen practical training.",
    body: "GBIST has inaugurated a newly equipped science laboratory to further strengthen practical, hands-on training for allied-health students. The laboratory supports sessions in hematology, clinical chemistry and microbiology, and features modern workstations, safety equipment and demonstration areas. The addition reflects the institute's ongoing commitment to quality practical education. Photography from the inauguration ceremony is available on the Gallery page.",
  },
];

export function getNoticeBySlug(slug) {
  return notices.find((n) => n.slug === slug);
}

export function formatDate(date) {
  if (!date) return "Date to be announced";
  return new Date(date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
