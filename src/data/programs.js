/**
 * Program data — PMF-listed program categories.
 * Dummy details for development; confirm official program information
 * with GBIST before publishing.
 */

export const programs = [
  {
    slug: "dispenser",
    title: "Dispenser",
    category: "Allied Health",
    icon: "pill",
    duration: "2 Years",
    shortDescription:
      "A pharmacy-focused allied-health program preparing students to assist in the safe dispensing and management of medicines.",
    overview:
      "The Dispenser program at GBIST prepares students for supportive roles in community pharmacies, hospitals and healthcare facilities. Students learn dispensing techniques, basic pharmacology, drug storage and inventory management through classroom instruction and supervised practical training.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Pharmacy Fundamentals & Dispensing Techniques",
      "Pharmaceutics & Dosage Forms",
      "Basic Pharmacology",
      "Store & Inventory Management",
      "Community Pharmacy Practice",
      "First Aid & Basic Life Support",
    ],
    careers: [
      "Community / retail pharmacy assistant",
      "Hospital pharmacy support staff",
      "Medical store dispenser",
      "Pharmaceutical supply & inventory roles",
    ],
  },
  {
    slug: "medical-lab-technology",
    title: "Medical Lab Technology",
    category: "Allied Health",
    icon: "microscope",
    duration: "2 Years",
    shortDescription:
      "Training in laboratory diagnostics — specimen collection, testing and analysis under professional supervision.",
    overview:
      "The Medical Lab Technology program prepares students to work in diagnostic laboratories through structured classroom and practical learning. Students gain hands-on experience in specimen handling, laboratory testing and quality control in our purpose-built science laboratory.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Human Anatomy & Physiology",
      "Basic Medical Biochemistry",
      "Hematology & Blood Banking",
      "Clinical Microbiology",
      "Clinical Chemistry & Serology",
      "Phlebotomy & Specimen Handling",
      "Laboratory Safety & Quality Control",
    ],
    careers: [
      "Diagnostic laboratory technologist (support)",
      "Hospital laboratory assistant",
      "Blood bank technician (support)",
      "Research laboratory assistant",
    ],
  },
  {
    slug: "operation-theater-technology",
    title: "Operation Theater Technology",
    category: "Allied Health",
    icon: "activity",
    duration: "2 Years",
    shortDescription:
      "Preparation for assisting in operation theaters — sterilization, instrumentation and perioperative support.",
    overview:
      "The Operation Theater Technology program trains students to support surgical teams through knowledge of OT procedures, instruments and safety protocols. Emphasis is placed on sterilization, patient preparation and maintaining a safe perioperative environment.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Surgical Instrumentation",
      "Sterilization & Infection Control",
      "Operation Theater Setup & Protocols",
      "Anesthesia Technology Basics",
      "Patient Positioning & Preparation",
      "Perioperative Safety & Emergencies",
    ],
    careers: [
      "Operation theater assistant",
      "Surgical unit support staff",
      "CSSD (sterilization) technician",
      "Emergency / trauma OT support",
    ],
  },
  {
    slug: "dental-technician",
    title: "Dental Technician",
    category: "Allied Health",
    icon: "activity",
    duration: "2 Years",
    shortDescription:
      "Training in dental laboratory technology — fabrication of dental prosthetics, crowns, bridges, and orthodontic appliances.",
    overview:
      "The Dental Technician program prepares students to work in dental laboratories fabricating dental prosthetics and appliances. Students learn dental anatomy, materials science, and hands-on techniques for creating crowns, bridges, dentures, and orthodontic devices.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Dental Anatomy & Morphology",
      "Dental Materials Science",
      "Complete Denture Prosthodontics",
      "Fixed Prosthodontics (Crowns & Bridges)",
      "Orthodontic Appliance Fabrication",
      "Dental Laboratory Management",
    ],
    careers: [
      "Dental laboratory technician",
      "Dental prosthetics fabricator",
      "Orthodontic appliance technician",
      "Dental lab supervisor",
    ],
  },
  {
    slug: "physiotherapy-technician",
    title: "Physiotherapy Technician",
    category: "Allied Health",
    icon: "activity",
    duration: "2 Years",
    shortDescription:
      "Training in physiotherapy support — therapeutic exercises, modalities, and patient care under professional supervision.",
    overview:
      "The Physiotherapy Technician program prepares students to assist physiotherapists in patient care and rehabilitation. Students learn therapeutic exercises, electrotherapy modalities, patient handling, and basic assessment techniques.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Human Anatomy & Physiology",
      "Therapeutic Exercise Techniques",
      "Electrotherapy Modalities",
      "Musculoskeletal Assessment",
      "Neurological Rehabilitation Basics",
      "Patient Care & Communication",
    ],
    careers: [
      "Physiotherapy assistant",
      "Rehabilitation aide",
      "Sports therapy support staff",
      "Geriatric care assistant",
    ],
  },
  {
    slug: "dialysis-technician",
    title: "Dialysis Technician",
    category: "Allied Health",
    icon: "activity",
    duration: "2 Years",
    shortDescription:
      "Training in dialysis therapy — machine operation, patient monitoring, and vascular access care under professional supervision.",
    overview:
      "The Dialysis Technician program trains students to operate hemodialysis machines and provide patient care during dialysis treatments. Students learn dialysis principles, machine maintenance, water treatment, and complication management.",
    eligibility:
      "Matriculation (Science) or equivalent, as per Punjab Medical Faculty (PMF) requirements.",
    curriculum: [
      "Renal Anatomy & Physiology",
      "Principles of Hemodialysis",
      "Dialysis Machine Operation & Maintenance",
      "Water Treatment Systems",
      "Vascular Access Care",
      "Complication Management & Patient Monitoring",
    ],
    careers: [
      "Dialysis technician",
      "Hemodialysis unit support staff",
      "Renal care assistant",
      "Dialysis equipment technician",
    ],
  },
];

export function getProgramBySlug(slug) {
  return programs.find((p) => p.slug === slug);
}
