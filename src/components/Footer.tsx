import Link from "next/link";
import { site, courseCategories } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300">
      <div className="container-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-white">{site.shortName}</h3>
          <p className="mt-1 text-sm font-semibold text-gold">
            {site.brand} — {site.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {site.description}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Reg. No. {site.regNo}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/courses", "All Courses"],
              ["/bihar-student-credit-card", "Bihar Student Credit Card"],
              ["/admission", "Apply for Admission"],
              ["/about", "About Us"],
              ["/contact", "Contact"],
              ["/crm", "Staff / Student Login"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Programmes
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {courseCategories.map((c) => (
              <li key={c}>
                <Link href="/courses" className="hover:text-gold transition">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>
              📍 {site.address.line1}, {site.address.line2}
            </li>
            <li>
              📞{" "}
              {site.phones.map((p, i) => (
                <span key={p}>
                  <a href={`tel:${p}`} className="hover:text-gold">
                    {p}
                  </a>
                  {i < site.phones.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            <li>
              ✉{" "}
              <a href={`mailto:${site.emails[0]}`} className="hover:text-gold break-all">
                {site.emails[0]}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wrap flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Made with care for students of Bihar & India.</p>
        </div>
      </div>
    </footer>
  );
}
