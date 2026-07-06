import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { courses, courseCategories, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Explore all courses offered by Meera Prakash Education Center — B.Tech, MBBS, Nursing, Pharmacy, Agriculture, B.Ed, ITI and more with direct admission.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        badge="20+ Career Programmes"
        title="All Courses & Programmes"
        subtitle="Direct and confirmed admission across engineering, medical, agriculture, teaching, ITI and library science."
      />

      <div className="container-wrap py-14 md:py-20">
        {courseCategories.map((cat) => {
          const list = courses.filter((c) => c.category === cat);
          if (!list.length) return null;
          return (
            <div key={cat} className="mb-14">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-navy">{cat}</h2>
                <span className="h-px flex-1 bg-slate-200" />
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  {list.length} courses
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <div key={c.slug} className="card-hover flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-bold text-navy">{c.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">⏱ {c.duration}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">🎓 {c.eligibility}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm text-slate-600">{c.blurb}</p>
                    <div className="mt-5 flex gap-2">
                      <Link
                        href={`/admission?course=${encodeURIComponent(c.name)}`}
                        className="flex-1 rounded-full bg-navy px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-navy-dark"
                      >
                        Apply
                      </Link>
                      <a
                        href={whatsappLink(`I want details about ${c.name} admission.`)}
                        target="_blank"
                        className="rounded-full border border-slate-300 px-4 py-2.5 text-center text-sm font-bold text-slate-700 transition hover:border-saffron hover:text-saffron"
                      >
                        Ask
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-bold text-navy">Don&apos;t see your course?</h3>
          <p className="mt-2 text-slate-600">
            We work with many colleges. Contact us and we&apos;ll find the right programme for you.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/admission" className="rounded-full bg-saffron px-6 py-3 font-bold text-white hover:bg-brandred">
              Apply for Admission
            </Link>
            <a
              href={whatsappLink("I want to know about a course not listed on the website.")}
              target="_blank"
              className="rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
