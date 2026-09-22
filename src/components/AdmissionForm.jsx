import { useState } from "react";
import { Upload, X, FileText, CheckCircle2, Send, Loader2 } from "lucide-react";
import { programs } from "../data/programs.js";
import { site } from "../data/site.js";
import { supabase } from "../lib/supabase.js";

const docSlots = [
  { key: "matric", label: "Matric Certificates / Result Cards" },
  { key: "cnic", label: "CNIC / B-Form Copy" },
  { key: "photos", label: "Recent Passport-Size Photographs" },
  { key: "character", label: "Character Certificate" },
  { key: "domicile", label: "Domicile Certificate" },
  { key: "fatherCnic", label: "Father's CNIC Copy" },
];

const initial = {
  name: "",
  fatherName: "",
  fatherCnic: "",
  cnic: "",
  phone: "",
  emergencyContact: "",
  email: "",
  program: "",
  qualification: "",
  address: "",
};

/** One document upload slot — dashed pick box that shows the chosen file. */
function FileField({ id, label, file, error, onSelect, onClear }) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-input border border-teal/40 bg-teal-tint/60 px-3.5 py-2.5">
          <span className="flex min-w-0 items-center gap-2 text-sm text-navy">
            <FileText size={16} className="shrink-0 text-teal" aria-hidden="true" />
            <span className="truncate">{file.name}</span>
            <span className="shrink-0 text-xs text-muted">({Math.ceil(file.size / 1024)} KB)</span>
          </span>
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${label}`}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white hover:text-red-600"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-input border border-dashed border-line bg-ice px-3.5 py-3 text-sm text-muted transition-colors hover:border-teal hover:text-teal"
        >
          <Upload size={16} aria-hidden="true" />
          Choose file (PDF or image)
        </label>
      )}
      <input
        id={id}
        type="file"
        accept=".pdf,image/*"
        className="sr-only"
        onChange={onSelect}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/**
 * Online admission application form (UI-only demo).
 * Validates fields + required document uploads; submit shows a confirmation.
 */
export default function AdmissionForm() {
  const [values, setValues] = useState(initial);
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [appNo, setAppNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const pickFile = (key) => (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFiles((prev) => ({ ...prev, [key]: f }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    e.target.value = "";
  };

  const clearFile = (key) => setFiles((prev) => ({ ...prev, [key]: undefined }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.fatherName.trim()) next.fatherName = "Please enter your father's name.";
    if (!/^[0-9]{5}-?[0-9]{7}-?[0-9]$/.test(values.fatherCnic.trim()))
      next.fatherCnic = "Please enter a valid Father's CNIC (e.g. 37301-1234567-1).";
    if (!/^[0-9]{5}-?[0-9]{7}-?[0-9]$/.test(values.cnic.trim()))
      next.cnic = "Please enter a valid CNIC / B-Form number (e.g. 37301-1234567-1).";
    if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!/^[0-9+\-\s()]{7,20}$/.test(values.emergencyContact.trim()))
      next.emergencyContact = "Please enter a valid emergency contact number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.program) next.program = "Please select a program.";
    if (!values.qualification.trim()) next.qualification = "Please enter your last qualification.";
    if (!values.address.trim()) next.address = "Please enter your address.";
    docSlots.forEach(({ key, label }) => {
      if (!files[key]) next[key] = "Please upload this document.";
    });
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // Prepare FormData for Edge Function
      const formData = new FormData();
      
      // Add form fields
      Object.entries(values).forEach(([key, value]) => {
        const fieldMap = {
          name: 'fullName',
          fatherName: 'fatherName',
          fatherCnic: 'fatherCnic',
          cnic: 'applicantCnic',
          phone: 'phone',
          emergencyContact: 'emergencyContact',
          email: 'email',
          program: 'program',
          qualification: 'qualification',
          address: 'address',
        };
        if (fieldMap[key]) formData.append(fieldMap[key], value);
      });

      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      // Call Supabase Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-admission`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setAppNo(result.referenceNumber);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card flex flex-col items-center px-6 py-12 text-center" role="status">
        <CheckCircle2 size={44} className="text-teal" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
          Application Submitted
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you, {values.name.split(" ")[0]}. Your application reference number is{" "}
          <span className="font-semibold text-navy">{appNo}</span>. Our admissions office will
          contact you for document verification — please bring the original documents along.
        </p>
        <p className="mt-3 max-w-md rounded-input bg-ice px-4 py-2.5 text-xs leading-relaxed text-muted">
          Note: This is a demo form — submissions are not sent anywhere yet. For immediate
          queries, call {site.phone}.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setFiles({});
            setSubmitted(false);
          }}
          className="btn-secondary mt-6"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="af-name" className="field-label">
            Full Name <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            className="field-input"
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="af-father" className="field-label">
            Father's Name <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-father"
            type="text"
            value={values.fatherName}
            onChange={set("fatherName")}
            aria-invalid={Boolean(errors.fatherName)}
            className="field-input"
            placeholder="Father's full name"
          />
          {errors.fatherName && <p className="mt-1.5 text-xs text-red-600">{errors.fatherName}</p>}
        </div>

        <div>
          <label htmlFor="af-father-cnic" className="field-label">
            Father's CNIC <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-father-cnic"
            type="text"
            inputMode="numeric"
            value={values.fatherCnic}
            onChange={set("fatherCnic")}
            aria-invalid={Boolean(errors.fatherCnic)}
            className="field-input"
            placeholder="37301-1234567-1"
          />
          {errors.fatherCnic && <p className="mt-1.5 text-xs text-red-600">{errors.fatherCnic}</p>}
        </div>

        <div>
          <label htmlFor="af-cnic" className="field-label">
            Your CNIC / B-Form No. <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-cnic"
            type="text"
            inputMode="numeric"
            value={values.cnic}
            onChange={set("cnic")}
            aria-invalid={Boolean(errors.cnic)}
            className="field-input"
            placeholder="37301-1234567-1"
          />
          {errors.cnic && <p className="mt-1.5 text-xs text-red-600">{errors.cnic}</p>}
        </div>

        <div>
          <label htmlFor="af-phone" className="field-label">
            Phone <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            className="field-input"
            placeholder="03XX XXXXXXX"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="af-emergency" className="field-label">
            Emergency Contact <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-emergency"
            type="tel"
            autoComplete="tel"
            value={values.emergencyContact}
            onChange={set("emergencyContact")}
            aria-invalid={Boolean(errors.emergencyContact)}
            className="field-input"
            placeholder="03XX XXXXXXX"
          />
          {errors.emergencyContact && <p className="mt-1.5 text-xs text-red-600">{errors.emergencyContact}</p>}
        </div>

        <div>
          <label htmlFor="af-email" className="field-label">
            Email <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            className="field-input"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="af-program" className="field-label">
            Program <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <select
            id="af-program"
            value={values.program}
            onChange={set("program")}
            aria-invalid={Boolean(errors.program)}
            className="field-input"
          >
            <option value="">Select a program</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
          {errors.program && <p className="mt-1.5 text-xs text-red-600">{errors.program}</p>}
        </div>

        <div>
          <label htmlFor="af-qualification" className="field-label">
            Last Qualification <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-qualification"
            type="text"
            value={values.qualification}
            onChange={set("qualification")}
            aria-invalid={Boolean(errors.qualification)}
            className="field-input"
            placeholder="e.g. Matric (Science) — 2025"
          />
          {errors.qualification && (
            <p className="mt-1.5 text-xs text-red-600">{errors.qualification}</p>
          )}
        </div>

        <div>
          <label htmlFor="af-address" className="field-label">
            Address <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="af-address"
            type="text"
            autoComplete="street-address"
            value={values.address}
            onChange={set("address")}
            aria-invalid={Boolean(errors.address)}
            className="field-input"
            placeholder="Town / city, district"
          />
          {errors.address && <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>}
        </div>
      </div>

      {/* Document uploads */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="font-heading text-base font-semibold text-navy">
          Upload Documents
        </legend>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          PDF ya image files upload karein — har document zaroori hai.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {docSlots.map(({ key, label }) => (
            <FileField
              key={key}
              id={`af-doc-${key}`}
              label={`${label} *`}
              file={files[key]}
              error={errors[key]}
              onSelect={pickFile(key)}
              onClear={() => clearFile(key)}
            />
          ))}
        </div>
      </fieldset>

      {submitError && (
        <div className="mt-4 rounded-input bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-8 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Submit Application
          </>
        )}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Original document verification will be done at the admission office — after submission,
        the office will contact you.
      </p>
    </form>
  );
}
