export default function PageHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <section className="hero-gradient text-white">
      <div className="container-wrap py-14 md:py-20 text-center">
        {badge && (
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20">
            {badge}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-200">{subtitle}</p>}
      </div>
    </section>
  );
}
