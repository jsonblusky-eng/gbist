import { useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { setPageMeta } from "../utils.js";
import { site } from "../data/site.js";
import PageHero from "../components/PageHero.jsx";
import ContactForm from "../components/ContactForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CTASection from "../components/CTASection.jsx";

const contactItems = [
  { icon: MapPin, label: "Address", value: site.address },
  { icon: Phone, label: "Phone", value: site.phone },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Clock, label: "Office Hours", value: site.officeHours },
];

export default function Contact() {
  useEffect(() => {
    setPageMeta(
      "Contact",
      "Contact Gulzar Begum Institute of Science & Technology, Chakwal — address, phone, email and inquiry form.",
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="We welcome your questions about programs and admissions. Reach us by phone, email or the form below."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="py-14 md:py-18">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Info column */}
            <Reveal className="lg:col-span-2">
              <h2 className="font-heading text-xl font-semibold text-navy">Contact Information</h2>
              <ul className="mt-6 space-y-4 text-sm">
                {contactItems.map((item) => (
                  <li key={item.label} className="card flex items-start gap-3.5 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                      <item.icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy">{item.label}</p>
                      <p className="mt-0.5 leading-relaxed text-muted">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="field-label">Follow GBIST</p>
                <p className="text-sm leading-relaxed text-muted">{site.socialNote}</p>
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal delay={100} className="lg:col-span-3">
              <h2 className="mb-6 font-heading text-xl font-semibold text-navy">Send a Message</h2>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-ice py-14 md:py-18">
        <div className="container-content">
          <SectionHeading
            eyebrow="Location"
            title="Find Us in Chakwal"
            text="We're located on Main Talagang Road, near Civil Hospital, Chakwal."
          />
          <Reveal className="mt-10">
            <div className="card flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
              <MapPin size={32} className="text-teal" aria-hidden="true" />
              <h3 className="font-heading text-lg font-semibold text-navy">Location Map</h3>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {site.address} — visitors are welcome during office hours, Monday to Saturday,
                8:00 AM – 4:00 PM.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Journey?"
        text="Explore our allied-health programs and take the first step toward a healthcare career."
        primary={{ label: "Explore Programs", to: "/programs" }}
        secondary={{ label: "Admission Information", to: "/admissions" }}
      />
    </>
  );
}
