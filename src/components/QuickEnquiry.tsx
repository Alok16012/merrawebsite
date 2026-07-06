"use client";

import { useState } from "react";
import { courses, whatsappLink } from "@/lib/site";

export default function QuickEnquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", course: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Home Quick Enquiry" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mt-4 rounded-xl bg-green-50 p-5 text-center">
        <div className="text-3xl">✅</div>
        <p className="mt-2 font-bold text-green-700">Thank you, {form.name || "Student"}!</p>
        <p className="mt-1 text-sm text-slate-600">
          Our counsellor will call you soon. You can also message us now:
        </p>
        <a
          href={whatsappLink(
            `Hi, I am ${form.name}. I enquired about ${form.course || "admission"}. My number is ${form.phone}.`
          )}
          target="_blank"
          className="mt-3 inline-block rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
      />
      <input
        required
        type="tel"
        pattern="[0-9]{10}"
        title="Enter a 10-digit mobile number"
        placeholder="Mobile Number (10 digits)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
      />
      <select
        required
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.slug} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-saffron py-3 text-sm font-bold text-white transition hover:bg-brandred disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request a Call Back"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">
          Could not send. Please WhatsApp/call us directly.
        </p>
      )}
      <p className="text-center text-[11px] text-slate-400">
        100% free counselling. Your details are safe with us.
      </p>
    </form>
  );
}
