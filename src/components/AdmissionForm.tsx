"use client";

import { useState } from "react";
import { courses, whatsappLink } from "@/lib/site";

const emptyForm = {
  // Personal
  candidateName: "",
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  dob: "",
  phone: "",
  email: "",
  fatherMobile: "",
  // Address
  address: "",
  po: "",
  ps: "",
  dist: "",
  state: "",
  category: "",
  pin: "",
  aadhar: "",
  religion: "",
  // Qualification (10th / 12th / 10+2+3)
  q10Board: "",
  q10Year: "",
  q10Marks: "",
  q10Subjects: "",
  q10Aggregate: "",
  q12Board: "",
  q12Year: "",
  q12Marks: "",
  q12Subjects: "",
  q12Aggregate: "",
  qGradBoard: "",
  qGradYear: "",
  qGradMarks: "",
  qGradSubjects: "",
  qGradAggregate: "",
  // Admission details
  course: "",
  session: "",
  examThisYear: "",
  rankThisYear: "",
  examLastYear: "",
  rankLastYear: "",
  collegePreference: "",
  statePreference: "",
  expectedBudget: "",
  place: "",
  // Photo (candidate passport photo — stored as data URL, uploaded server-side)
  photoData: "",
  photoName: "",
  // Extras
  wantsCreditCard: false,
  message: "",
  // Consent
  agreeTerms: false,
};

type FormState = typeof emptyForm;

export default function AdmissionForm({ defaultCourse = "" }: { defaultCourse?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState<FormState>({ ...emptyForm, course: defaultCourse });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const [photoError, setPhotoError] = useState("");

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setPhotoError("Photo must be under 3 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, photoData: String(reader.result), photoName: file.name }));
    reader.readAsDataURL(file);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Hard guard: must accept terms & conditions before submitting.
    if (!form.agreeTerms) {
      setStatus("error");
      return;
    }
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
          Thank you, <strong>{form.candidateName}</strong>. Our admission counsellor will contact
          you on <strong>{form.phone}</strong> very soon. A confirmation has been sent to our team.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(
              `Hi, I am ${form.candidateName}. I applied for ${form.course || "admission"}. Please guide me. (Phone: ${form.phone})`
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
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20";
  const labelCls = "mb-1 block text-xs font-semibold text-slate-700";

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* ── Personal Details ─────────────────────────────── */}
      <section>
        <h3 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">
          Candidate Details
        </h3>

        {/* Passport photo */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[10px] text-slate-400">
            {form.photoData ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.photoData} alt="Candidate" className="h-full w-full object-cover" />
            ) : (
              "Photo"
            )}
          </div>
          <div>
            <label className={labelCls}>Candidate&apos;s Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onPhoto}
              className="block w-full text-xs text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-navy/90"
            />
            <p className="mt-1 text-[11px] text-slate-400">Passport-size photo, JPG/PNG, under 3 MB.</p>
            {photoError && <p className="mt-1 text-[11px] text-red-600">{photoError}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Candidate&apos;s Name *</label>
            <input required className={field} value={form.candidateName} onChange={(e) => update("candidateName", e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label className={labelCls}>Date of Birth</label>
            <input type="date" className={field} value={form.dob} onChange={(e) => update("dob", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Father&apos;s Name</label>
            <input className={field} value={form.fatherName} onChange={(e) => update("fatherName", e.target.value)} placeholder="Father's name" />
          </div>
          <div>
            <label className={labelCls}>Father&apos;s Occupation</label>
            <input className={field} value={form.fatherOccupation} onChange={(e) => update("fatherOccupation", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Mother&apos;s Name</label>
            <input className={field} value={form.motherName} onChange={(e) => update("motherName", e.target.value)} placeholder="Mother's name" />
          </div>
          <div>
            <label className={labelCls}>Mother&apos;s Occupation</label>
            <input className={field} value={form.motherOccupation} onChange={(e) => update("motherOccupation", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Contact No. *</label>
            <input required type="tel" pattern="[0-9]{10}" title="10-digit mobile number" className={field} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile" />
          </div>
          <div>
            <label className={labelCls}>Father&apos;s Mobile No.</label>
            <input type="tel" pattern="[0-9]{10}" title="10-digit mobile number" className={field} value={form.fatherMobile} onChange={(e) => update("fatherMobile", e.target.value)} placeholder="10-digit mobile" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>E-mail ID</label>
            <input type="email" className={field} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
          </div>
        </div>
      </section>

      {/* ── Address ──────────────────────────────────────── */}
      <section>
        <h3 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">
          Address Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Address / Village</label>
            <input className={field} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House / Village / Mohalla" />
          </div>
          <div>
            <label className={labelCls}>P.O. (Post Office)</label>
            <input className={field} value={form.po} onChange={(e) => update("po", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>P.S. (Police Station)</label>
            <input className={field} value={form.ps} onChange={(e) => update("ps", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>District</label>
            <input className={field} value={form.dist} onChange={(e) => update("dist", e.target.value)} placeholder="e.g. Patna" />
          </div>
          <div>
            <label className={labelCls}>State</label>
            <input className={field} value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="e.g. Bihar" />
          </div>
          <div>
            <label className={labelCls}>PIN Code</label>
            <input inputMode="numeric" pattern="[0-9]{6}" title="6-digit PIN code" className={field} value={form.pin} onChange={(e) => update("pin", e.target.value)} placeholder="6-digit PIN" />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select className={field} value={form.category} onChange={(e) => update("category", e.target.value)}>
              <option value="">Select</option>
              <option>General</option>
              <option>OBC</option>
              <option>EBC / BC-1</option>
              <option>BC-2</option>
              <option>SC</option>
              <option>ST</option>
              <option>EWS</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Religion</label>
            <input className={field} value={form.religion} onChange={(e) => update("religion", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Aadhar No.</label>
            <input inputMode="numeric" pattern="[0-9]{12}" title="12-digit Aadhar number" className={field} value={form.aadhar} onChange={(e) => update("aadhar", e.target.value)} placeholder="12-digit Aadhar" />
          </div>
        </div>
      </section>

      {/* ── Qualification Details ────────────────────────── */}
      <section>
        <h3 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">
          Qualification Details
        </h3>
        <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[640px] border-collapse text-xs">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2 pr-2 font-semibold">Course</th>
                <th className="px-2 py-2 font-semibold">Board / University</th>
                <th className="px-2 py-2 font-semibold">Passing Year</th>
                <th className="px-2 py-2 font-semibold">Total Marks</th>
                <th className="px-2 py-2 font-semibold">Subjects</th>
                <th className="px-2 py-2 font-semibold">Aggregate %</th>
              </tr>
            </thead>
            <tbody>
              {([
                ["10th", "q10Board", "q10Year", "q10Marks", "q10Subjects", "q10Aggregate"],
                ["12th", "q12Board", "q12Year", "q12Marks", "q12Subjects", "q12Aggregate"],
                ["10+2+3", "qGradBoard", "qGradYear", "qGradMarks", "qGradSubjects", "qGradAggregate"],
              ] as const).map(([label, b, y, m, s, a]) => (
                <tr key={label} className="align-top">
                  <td className="py-1.5 pr-2 text-sm font-semibold text-slate-700">{label}</td>
                  <td className="px-1 py-1.5"><input className={field} value={form[b]} onChange={(e) => update(b, e.target.value)} /></td>
                  <td className="px-1 py-1.5"><input inputMode="numeric" className={field} value={form[y]} onChange={(e) => update(y, e.target.value)} /></td>
                  <td className="px-1 py-1.5"><input inputMode="numeric" className={field} value={form[m]} onChange={(e) => update(m, e.target.value)} /></td>
                  <td className="px-1 py-1.5"><input className={field} value={form[s]} onChange={(e) => update(s, e.target.value)} /></td>
                  <td className="px-1 py-1.5"><input inputMode="decimal" className={field} value={form[a]} onChange={(e) => update(a, e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Admission / Counselling Details ──────────────── */}
      <section>
        <h3 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">
          Admission Preference
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Course / Branch *</label>
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
            <label className={labelCls}>Session</label>
            <input className={field} value={form.session} onChange={(e) => update("session", e.target.value)} placeholder="e.g. 2025-26" />
          </div>
          <div>
            <label className={labelCls}>Exam Applied / Appeared This Year</label>
            <input className={field} value={form.examThisYear} onChange={(e) => update("examThisYear", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>This Year Ranking</label>
            <input className={field} value={form.rankThisYear} onChange={(e) => update("rankThisYear", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Exam Appeared Last Year</label>
            <input className={field} value={form.examLastYear} onChange={(e) => update("examLastYear", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Last Year Ranking</label>
            <input className={field} value={form.rankLastYear} onChange={(e) => update("rankLastYear", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>College Preference</label>
            <input className={field} value={form.collegePreference} onChange={(e) => update("collegePreference", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>State Preference</label>
            <input className={field} value={form.statePreference} onChange={(e) => update("statePreference", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Expected Budget</label>
            <input className={field} value={form.expectedBudget} onChange={(e) => update("expectedBudget", e.target.value)} placeholder="e.g. ₹1,00,000" />
          </div>
          <div>
            <label className={labelCls}>Place</label>
            <input className={field} value={form.place} onChange={(e) => update("place", e.target.value)} placeholder="e.g. Patna" />
          </div>
        </div>

        <label className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm">
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

        <div className="mt-4">
          <label className={labelCls}>Message (optional)</label>
          <textarea rows={3} className={field} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any question or preference..." />
        </div>
      </section>

      {/* ── Terms & Conditions ───────────────────────────── */}
      <section>
        <h3 className="mb-3 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">
          Terms &amp; Conditions
        </h3>
        <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
          <p className="mb-2">By submitting this admission / counselling form, I declare and agree that:</p>
          <ol className="list-decimal space-y-1.5 pl-4">
            <li>All the information provided above is true and correct to the best of my knowledge.</li>
            <li>I authorise Meera Prakash Education Center (Admission Guru) to contact me on the phone number, WhatsApp and email provided for admission-related counselling.</li>
            <li>Counselling and guidance are advisory; final admission is subject to the eligibility, rules and seat availability of the respective college / university.</li>
            <li>
              <strong>The registration / admission amount paid is strictly non-refundable and non-transferable</strong> under any circumstances, whether or not the admission is finalised.
            </li>
            <li>Any fee paid towards counselling, registration or processing is as per the institute&apos;s policy and is separate from the college / university fee.</li>
            <li>I consent to my details being stored and processed by the institute for the purpose of my admission.</li>
          </ol>
        </div>
        <label className="mt-3 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            required
            checked={form.agreeTerms}
            onChange={(e) => update("agreeTerms", e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-saffron"
          />
          <span className="text-slate-700">
            I have read and <strong>agree to the Terms &amp; Conditions</strong> above. *
          </span>
        </label>
      </section>

      <button
        type="submit"
        disabled={status === "sending" || !form.agreeTerms}
        className="w-full rounded-full bg-saffron py-4 text-base font-bold text-white shadow transition hover:bg-brandred disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit Admission Form"}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          {form.agreeTerms
            ? "Something went wrong. Please try again or WhatsApp us directly."
            : "Please accept the Terms & Conditions before submitting."}
        </p>
      )}
      <p className="text-center text-xs text-slate-400">
        By submitting, you agree to be contacted by our team on phone, WhatsApp &amp; email.
      </p>
    </form>
  );
}
