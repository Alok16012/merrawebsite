import Link from "next/link";
import { courses, courseCategories, site, whatsappLink } from "@/lib/site";
import QuickEnquiry from "@/components/QuickEnquiry";

const stats = [
  { value: "5000+", label: "Students Guided" },
  { value: "100+", label: "Partner Colleges" },
  { value: "20+", label: "Courses" },
  { value: "100%", label: "Placement Support" },
];

const features = [
  {
    icon: "🎯",
    title: "Direct & Confirmed Admission",
    text: "We get you seats in verified, recognised colleges — no running around, no confusion.",
  },
  {
    icon: "💰",
    title: "Low Fee & Easy Instalments",
    text: "Affordable fee structures with easy instalment options so cost never stops your dream.",
  },
  {
    icon: "🏦",
    title: "Bihar Student Credit Card Help",
    text: "Complete assistance for the Bihar Student Credit Card scheme — up to ₹4 lakh education loan.",
  },
  {
    icon: "🩺",
    title: "Medical Seats Included",
    text: "MBBS, BAMS, BHMS, Nursing, Pharmacy and paramedical — full medical admission support.",
  },
  {
    icon: "🎓",
    title: "100% Placement Guaranteed Colleges",
    text: "We connect you to colleges with strong placement records and industry tie-ups.",
  },
  {
    icon: "🤝",
    title: "End-to-End Counselling",
    text: "From choosing the right course to document verification and enrolment — we handle it all.",
  },
];

const steps = [
  { n: "1", title: "Fill the Form", text: "Submit the admission enquiry form online in 2 minutes." },
  { n: "2", title: "Get a Call", text: "Our counsellor calls you on phone & WhatsApp with options." },
  { n: "3", title: "Choose College", text: "Compare fee, location & placement and pick your best fit." },
  { n: "4", title: "Confirm Seat", text: "Complete documents & fee, and secure your admission." },
];

const testimonials = [
  {
    name: "Rahul Kumar",
    course: "B.Tech, CSE",
    text: "Meera Prakash Education Center got me direct admission with low fee. The Bihar Student Credit Card process was fully handled by their team.",
  },
  {
    name: "Priya Sharma",
    course: "B.Sc Nursing",
    text: "I was confused about nursing colleges. Admission Guru guided me end to end and I got a seat in a good college near Patna.",
  },
  {
    name: "Amit Raj",
    course: "Polytechnic",
    text: "Very supportive team. Everything was explained clearly and my admission was confirmed quickly. Highly recommended.",
  },
];

export default function Home() {
  const featured = courses.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient text-white">
        <div className="container-wrap grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20">
              🎓 Govt.-Registered Company • Since 2022
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Get <span className="text-gold">Direct &amp; Confirmed</span> College Admission
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">
              {site.name} — your trusted <strong>Admission Guru</strong> in Patna, Bihar.
              Engineering, Medical, Nursing, Agriculture, Teaching &amp; ITI admissions with
              <strong> low fee</strong> and <strong>easy instalments</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admission"
                className="rounded-full bg-saffron px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:bg-brandred"
              >
                Apply for Admission →
              </Link>
              <a
                href={whatsappLink("Hello! I want free admission counselling.")}
                target="_blank"
                className="rounded-full bg-white/10 px-7 py-3.5 text-base font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                Free Counselling on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
                  <div className="text-2xl font-extrabold text-gold">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-300">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry card */}
          <div className="lg:justify-self-end">
            <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-2xl sm:p-8">
              <h3 className="text-xl font-bold text-navy">Free Admission Enquiry</h3>
              <p className="mt-1 text-sm text-slate-500">
                Fill this &amp; our counsellor will call you today.
              </p>
              <QuickEnquiry />
            </div>
          </div>
        </div>

        {/* Course marquee */}
        <div className="border-t border-white/10 bg-black/10 py-3 overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-semibold text-slate-200">
            {[...courses, ...courses].map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-gold">★</span> {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24">
        <div className="container-wrap">
          <SectionHead
            kicker="Why Choose Us"
            title="Why Students Trust Admission Guru"
            subtitle="A registered education company helping students across Bihar & India secure the right college seat."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-hover rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIHAR STUDENT CREDIT CARD BANNER */}
      <section className="bg-gradient-to-r from-navy to-brandblue py-14 text-white">
        <div className="container-wrap grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-block rounded-full bg-gold/20 px-4 py-1 text-xs font-bold text-gold ring-1 ring-gold/40">
              GOVERNMENT SCHEME
            </span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Study Now, Pay Later with the <br className="hidden sm:block" />
              Bihar Student Credit Card
            </h2>
            <p className="mt-4 max-w-2xl text-slate-200">
              Get an education loan of up to <strong className="text-gold">₹4,00,000</strong> from
              the Government of Bihar. We provide complete, free assistance — eligibility check,
              documents, application and college coordination.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/bihar-student-credit-card"
                className="rounded-full bg-white px-6 py-3 font-bold text-navy transition hover:bg-gold"
              >
                Know Full Details →
              </Link>
              <a
                href={whatsappLink("I want help with the Bihar Student Credit Card.")}
                target="_blank"
                className="rounded-full bg-white/10 px-6 py-3 font-bold ring-1 ring-white/30 hover:bg-white/20"
              >
                Get Free Help
              </a>
            </div>
          </div>
          <ul className="space-y-3 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
            {[
              "Loan up to ₹4 lakh for higher education",
              "For students of Bihar aged 25 or below",
              "Covers tuition, hostel, books & more",
              "No collateral / guarantor from family income",
              "We handle the full application for free",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 text-gold">✔</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="py-16 md:py-24">
        <div className="container-wrap">
          <SectionHead
            kicker="Programmes"
            title="Popular Courses We Offer"
            subtitle="From engineering and medical to teaching and ITI — pick from 20+ career-focused programmes."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <div key={c.slug} className="card-hover rounded-2xl border border-slate-200 bg-white p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  {c.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-navy">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">⏱ {c.duration}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">🎓 {c.eligibility}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{c.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-block rounded-full bg-navy px-8 py-3.5 font-bold text-white transition hover:bg-navy-dark"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="bg-slate-50 py-14">
        <div className="container-wrap">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500">
            Admission Available In
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {courseCategories.map((c) => (
              <Link
                key={c}
                href="/courses"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition hover:border-saffron hover:text-saffron"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24">
        <div className="container-wrap">
          <SectionHead
            kicker="Simple Process"
            title="How Admission Works"
            subtitle="Four easy steps to secure your college seat with us."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron text-xl font-extrabold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-wrap">
          <SectionHead
            kicker="Success Stories"
            title="What Our Students Say"
            subtitle="Real feedback from students who secured admission through us."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-gold">★★★★★</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero-gradient py-16 text-white">
        <div className="container-wrap text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Secure Your Admission?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Talk to our expert counsellors today. Free guidance, honest advice and confirmed seats.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/admission"
              className="rounded-full bg-saffron px-8 py-3.5 font-bold text-white shadow-lg transition hover:bg-brandred"
            >
              Apply Now
            </Link>
            <a
              href={`tel:${site.phones[0]}`}
              className="rounded-full bg-white px-8 py-3.5 font-bold text-navy transition hover:bg-gold"
            >
              📞 Call {site.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-bold uppercase tracking-widest text-saffron">
        {kicker}
      </span>
      <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  );
}
