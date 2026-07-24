import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 group sm:gap-3">
      <span className="relative h-10 w-10 shrink-0 rounded-full ring-2 ring-white/70 overflow-hidden bg-white sm:h-11 sm:w-11">
        <Image
          src="/logo.svg"
          alt={site.name}
          fill
          sizes="44px"
          className="object-contain p-0.5"
          priority
        />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate text-[13px] font-extrabold tracking-tight sm:text-[15px] ${
            light ? "text-white" : "text-navy"
          }`}
        >
          Meera Prakash Education
        </span>
        <span
          className={`hidden text-[11px] font-semibold sm:block ${
            light ? "text-gold" : "text-saffron"
          }`}
        >
          Admission Guru • Patna
        </span>
      </span>
    </Link>
  );
}
