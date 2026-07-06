"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/bihar-student-credit-card", label: "Student Credit Card" },
  { href: "/payment", label: "Fee Payment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-navy-dark text-white text-xs">
        <div className="container-wrap flex flex-wrap items-center justify-between gap-2 py-1.5">
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">📞</span>
            <a href={`tel:${site.phones[0]}`} className="hover:text-gold">
              {site.phones[0]}
            </a>
            <span className="opacity-40">|</span>
            <a href={`tel:${site.phones[1]}`} className="hover:text-gold hidden sm:inline">
              {site.phones[1]}
            </a>
          </span>
          <span className="flex items-center gap-3">
            <a href={`mailto:${site.emails[0]}`} className="hover:text-gold hidden md:inline">
              ✉ {site.emails[0]}
            </a>
            <a
              href={whatsappLink("Hello, I want admission guidance.")}
              target="_blank"
              className="font-semibold text-gold hover:underline"
            >
              WhatsApp Us
            </a>
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="container-wrap flex items-center justify-between py-3">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-navy rounded-md hover:bg-slate-50 transition"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/admission"
              className="ml-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-brandred transition"
            >
              Apply Now
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-navy hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="container-wrap flex flex-col py-3">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 text-sm font-semibold text-slate-700 border-b border-slate-100"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/admission"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-saffron px-5 py-3 text-center text-sm font-bold text-white"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
