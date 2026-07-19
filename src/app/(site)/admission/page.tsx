import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AdmissionForm from "@/components/AdmissionForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply for Admission",
  description:
    "Apply online for direct college admission with Meera Prakash Education Center. Fill the form and our counsellor will contact you on phone & WhatsApp.",
};

const perks = [
  "Free expert counselling",
  "Confirmed seat in recognised colleges",
  "Low fee & easy instalments",
  "Bihar Student Credit Card support",
];

export default async function AdmissionPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;

  return (
    <>
      <PageHeader
        badge="Admission Open 2025-26"
        title="Apply for Admission"
        subtitle="Fill this short form. Our counsellor will call and guide you — completely free."
      />

      <div className="container-wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.3fr]">
        {/* Left info */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy">Why apply with us?</h3>
            <ul className="mt-4 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 text-saffron">✔</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-navy p-6 text-white">
            <h3 className="text-lg font-bold">Need help right now?</h3>
            <p className="mt-2 text-sm text-slate-200">
              Call or WhatsApp our admission desk any time.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {site.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block font-semibold hover:text-gold">
                  📞 {p}
                </a>
              ))}
              <a href={`mailto:${site.emails[0]}`} className="block break-all font-semibold hover:text-gold">
                ✉ {site.emails[0]}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Documents usually needed
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              10th / 12th / Graduation Marksheet, CLC, Migration, Caste / Residence Certificate,
              PAN, Aadhar, 6 Passport Photos, Mobile No. &amp; Email ID.
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-navy">Admission Enquiry Form</h2>
          <p className="mt-1 text-sm text-slate-500">Fields marked * are required.</p>
          <div className="mt-6">
            <AdmissionForm defaultCourse={course || ""} />
          </div>
        </div>
      </div>
    </>
  );
}
