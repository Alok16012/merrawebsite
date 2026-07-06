import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { whatsappLink, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bihar Student Credit Card — Loan up to ₹4 Lakh",
  description:
    "Get complete free help with the Bihar Student Credit Card scheme (BSCC). Education loan up to ₹4,00,000 for students of Bihar. Eligibility, documents & application support.",
};

const benefits = [
  { icon: "💸", title: "Loan up to ₹4 Lakh", text: "Financial assistance up to ₹4,00,000 for higher education after 12th." },
  { icon: "🚫", title: "No Guarantor Needed", text: "Government-backed scheme — no family collateral or outside guarantor required." },
  { icon: "📚", title: "Covers All Expenses", text: "Tuition fee, hostel, books, laptop, exam fee and other study costs." },
  { icon: "🕒", title: "Repay After Course", text: "Comfortable repayment that begins after your education is complete." },
];

const eligibility = [
  "Applicant must be a permanent resident of Bihar.",
  "Must have passed 12th (Intermediate) from a recognised board.",
  "Age should generally be 25 years or below.",
  "Admission taken in a recognised institution / course.",
];

const documents = [
  "10th & 12th Marksheet + Certificate",
  "Admission / Allotment letter of the college",
  "Aadhar Card & PAN Card",
  "Residence (Domicile) Certificate of Bihar",
  "Income Certificate",
  "Bank Passbook of student & co-applicant",
  "Passport-size Photographs",
  "Mobile Number & Email ID",
];

const steps = [
  { n: "1", title: "Eligibility Check", text: "We verify your documents and confirm you qualify." },
  { n: "2", title: "Online Registration", text: "We register you on the official BSCC / e-Kalyan portal." },
  { n: "3", title: "Document Upload", text: "We prepare and submit all required documents correctly." },
  { n: "4", title: "Verification & Approval", text: "We coordinate with the DRCC office until your loan is sanctioned." },
];

const faqs = [
  {
    q: "How much loan can I get?",
    a: "Under the Bihar Student Credit Card scheme, eligible students can get an education loan of up to ₹4,00,000 for higher studies.",
  },
  {
    q: "Do I have to repay during my course?",
    a: "No. Repayment generally begins after the completion of your course, giving you time to settle into a job first.",
  },
  {
    q: "Which courses are covered?",
    a: "Most recognised higher-education courses — engineering, medical, nursing, polytechnic, graduation, ITI and more are covered.",
  },
  {
    q: "How does Admission Guru help?",
    a: "We provide 100% free guidance — eligibility check, document preparation, online application and follow-up with the DRCC office until approval.",
  },
];

export default function CreditCardPage() {
  return (
    <>
      <PageHeader
        badge="🏦 Government of Bihar Scheme"
        title="Bihar Student Credit Card"
        subtitle="Study now, pay later. Get an education loan of up to ₹4,00,000 — and let our team handle the entire application for you, free of cost."
      />

      {/* Highlight bar */}
      <section className="bg-saffron text-white">
        <div className="container-wrap flex flex-wrap items-center justify-between gap-4 py-5 text-center sm:text-left">
          <p className="text-lg font-bold">
            Loan up to ₹4,00,000 • Zero application charges • Full support from our experts
          </p>
          <a
            href={whatsappLink("I want to apply for the Bihar Student Credit Card. Please help.")}
            target="_blank"
            className="rounded-full bg-white px-6 py-3 font-bold text-brandred transition hover:bg-navy hover:text-white"
          >
            Check My Eligibility
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-wrap py-14 md:py-20">
        <h2 className="text-center text-3xl font-extrabold text-navy">Key Benefits</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-4xl">{b.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-navy">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-wrap grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold text-navy">Eligibility</h3>
            <ul className="mt-5 space-y-3">
              {eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 text-green-600">✔</span>
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              * Exact criteria are decided by the Government of Bihar and may be updated from time to time.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold text-navy">Documents Required</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {documents.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-saffron">📄</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-wrap py-14 md:py-20">
        <h2 className="text-center text-3xl font-extrabold text-navy">How We Help You Apply</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-xl font-extrabold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-wrap max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold text-navy">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-navy">
                  {f.q}
                  <span className="text-saffron transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16 text-white">
        <div className="container-wrap text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Apply for Your Student Credit Card Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Don&apos;t let money stop your education. Our team will guide you through every step — free of cost.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/admission" className="rounded-full bg-saffron px-8 py-3.5 font-bold text-white hover:bg-brandred">
              Start My Application
            </Link>
            <a href={`tel:${site.phones[0]}`} className="rounded-full bg-white px-8 py-3.5 font-bold text-navy hover:bg-gold">
              📞 Call {site.phones[0]}
            </a>
          </div>
          <p className="mt-6 text-xs text-slate-300">
            Official portal: 7 Nishchay — e-Kalyan / DRCC, Government of Bihar. We are an
            independent education consultancy assisting students with the application.
          </p>
        </div>
      </section>
    </>
  );
}
