import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span className="relative h-11 w-11 shrink-0 rounded-full ring-2 ring-white/70 overflow-hidden bg-white">
        <Image
          src="/logo.svg"
          alt={site.name}
          fill
          sizes="44px"
          className="object-contain p-0.5"
          priority
        />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-[15px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-navy"
          }`}
        >
          Meera Prakash Education
        </span>
        <span
          className={`block text-[11px] font-semibold ${
            light ? "text-gold" : "text-saffron"
          }`}
        >
          Admission Guru • Patna
        </span>
      </span>
    </Link>
  );
}
