"use client";

import { useState } from "react";
import { courses, whatsappLink } from "@/lib/site";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  course: "",
  qualification: "",
  city: "",
  wantsCreditCard: false,
  message: "",
};

export default function AdmissionForm({ defaultCourse = "" }: { defaultCourse?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ ...emptyForm, course: defaultCourse });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Admission Page" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="mt-3 text-2xl font-bold text-green-700">Application Received!</h3>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          Thank you, <strong>{form.name}</strong>. Our admission counsellor will contact you on{" "}
          <strong>{form.phone}</strong> very soon. A confirmation has been sent to our team.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(
              `Hi, I am ${form.name}. I applied for ${form.course}. Please guide me. (Phone: ${form.phone})`
            )}
            target="_blank"
            className="rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
          >
            Message us on WhatsApp
          </a>
          <button
            onClick={() => {
              setForm(emptyForm);
              setStatus("idle");
            }}
            className="rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name *</label>
          <input required className={field} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Rahul Kumar" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Mobile Number *</label>
          <input required type="tel" pattern="[0-9]{10}" title="10-digit mobile number" className={field} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit number" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
          <input type="email" className={field} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">City / District</label>
          <input className={field} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Patna" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Course Interested In *</label>
          <select required className={field} value={form.course} onChange={(e) => update("course", e.target.value)}>
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Last Qualification</label>
          <select className={field} value={form.qualification} onChange={(e) => update("qualification", e.target.value)}>
            <option value="">Select</option>
            <option>10th Passed</option>
            <option>12th Passed</option>
            <option>Diploma</option>
            <option>Graduation</option>
            <option>Post Graduation</option>
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm">
        <input
          type="checkbox"
          checked={form.wantsCreditCard}
          onChange={(e) => update("wantsCreditCard", e.target.checked)}
          className="mt-0.5 h-5 w-5 accent-saffron"
        />
        <span className="text-slate-700">
          I want help with the <strong>Bihar Student Credit Card</strong> (education loan up to ₹4 lakh).
        </span>
      </label>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">Message (optional)</label>
        <textarea rows={3} className={field} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any question or preference..." />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-saffron py-4 text-base font-bold text-white shadow transition hover:bg-brandred disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit Admission Enquiry"}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Something went wrong. Please try again or WhatsApp us directly.
        </p>
      )}
      <p className="text-center text-xs text-slate-400">
        By submitting, you agree to be contacted by our team on phone, WhatsApp &amp; email.
      </p>
    </form>
  );
}
