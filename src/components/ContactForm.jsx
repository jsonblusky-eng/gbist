import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "../data/site.js";

const initial = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Please enter a subject.";
    if (values.message.trim().length < 10)
      next.message = "Please enter a message of at least 10 characters.";
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
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card flex flex-col items-center px-6 py-12 text-center" role="status">
        <CheckCircle2 size={44} className="text-teal" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
          Message Sent
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you, {values.name.split(" ")[0]}. Your message has been received — our admissions
          office will get back to you shortly. For urgent queries, call us at {site.phone}.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setSubmitted(false);
          }}
          className="btn-secondary mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="field-label">
            Full Name <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            className="field-input"
            placeholder="Your full name"
          />
          {errors.name && <p id="cf-name-err" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            className="field-input"
            placeholder="03XX XXXXXXX"
          />
          {errors.phone && <p id="cf-phone-err" className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="cf-email" className="field-label">
            Email <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className="field-input"
            placeholder="you@example.com"
          />
          {errors.email && <p id="cf-email-err" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="cf-subject" className="field-label">
            Subject <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input
            id="cf-subject"
            type="text"
            value={values.subject}
            onChange={set("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "cf-subject-err" : undefined}
            className="field-input"
            placeholder="e.g. Admission inquiry"
          />
          {errors.subject && <p id="cf-subject-err" className="mt-1.5 text-xs text-red-600">{errors.subject}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="field-label">
            Message <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <textarea
            id="cf-message"
            rows={5}
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            className="field-input resize-y"
            placeholder="How can we help you?"
          />
          {errors.message && <p id="cf-message-err" className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
        </div>
      </div>

      {submitError && (
        <div className="mt-4 rounded-input bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Submit Message
          </>
        )}
      </button>
    </form>
  );
}
