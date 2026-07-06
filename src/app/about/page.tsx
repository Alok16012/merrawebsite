import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Meera Prakash Education Center Pvt. Ltd. (Admission Guru) — a Govt.-registered education consultancy in Patna, Bihar helping students get direct admission.",
};

const values = [
  { icon: "🤝", title: "Honest Guidance", text: "We recommend what is genuinely right for the student — not just what earns us more." },
  { icon: "✅", title: "Verified Colleges", text: "We work only with recognised, approved institutions with real placement records." },
  { icon: "💬", title: "Always Reachable", text: "Phone, WhatsApp and office support before, during and after admission." },
  { icon: "🎓", title: "Student First", text: "Every decision is centred on the student's career and financial comfort." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Since 2022 • Reg. Company"
        title="About Admission Guru"
        subtitle={`${site.name} — helping students of Bihar and India build brighter futures.`}
      />

      <section className="container-wrap py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-saffron">Who We Are</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">
              Your trusted admission partner in Patna
            </h2>
            <p className="mt-4 text-slate-600">
              {site.name} is a Government of India registered private limited company
              (Reg. No. {site.regNo}), popularly known as <strong>Admission Guru</strong>. We help
              students secure <strong>direct and confirmed admission</strong> in top colleges across
              engineering, medical, nursing, pharmacy, agriculture, teaching and ITI streams.
            </p>
            <p className="mt-4 text-slate-600">
              Based in Sahganj, Professor Colony (near SBI ATM), Patna, our experienced counsellors
              guide each student personally — from choosing the right course and college to
              completing documents, fees and the <strong>Bihar Student Credit Card</strong> loan
              process. Our promise: <strong>low fee, easy instalments</strong> and 100% honest support.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                ["5000+", "Students"],
                ["100+", "Colleges"],
                ["20+", "Courses"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-4 text-center">
                  <div className="text-2xl font-extrabold text-navy">{v}</div>
                  <div className="text-xs text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="text-3xl">🎯</div>
              <h3 className="mt-3 text-xl font-bold text-navy">Our Mission</h3>
              <p className="mt-2 text-slate-600">
                To make quality higher education accessible to every student — regardless of their
                financial background — through honest counselling and affordable admission.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="text-3xl">🌟</div>
              <h3 className="mt-3 text-xl font-bold text-navy">Our Vision</h3>
              <p className="mt-2 text-slate-600">
                To be Bihar&apos;s most trusted admission consultancy, known for transparency,
                placement-focused colleges and complete student support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-wrap">
          <h2 className="text-center text-3xl font-extrabold text-navy">Our Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-gradient py-16 text-white">
        <div className="container-wrap text-center">
          <h2 className="text-3xl font-extrabold">Let&apos;s Build Your Future Together</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">
            Talk to our counsellors and take the first step towards your dream college.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/admission" className="rounded-full bg-saffron px-8 py-3.5 font-bold text-white hover:bg-brandred">
              Apply Now
            </Link>
            <Link href="/contact" className="rounded-full bg-white px-8 py-3.5 font-bold text-navy hover:bg-gold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
