import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AdmissionForm from "@/components/AdmissionForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Meera Prakash Education Center (Admission Guru), Sahganj, Professor Colony, Near SBI ATM, Patna-6. Call, WhatsApp or email for free admission counselling.",
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${site.address.line1}, ${site.address.line2}`
  );

  return (
    <>
      <PageHeader
        badge="We&apos;re here to help"
        title="Contact Us"
        subtitle="Reach out for free admission counselling. Call, WhatsApp, email or visit our office in Patna."
      />

      <section className="container-wrap py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-5">
            <ContactCard icon="📍" title="Office Address">
              {site.address.line1},<br />
              {site.address.line2}
            </ContactCard>

            <ContactCard icon="📞" title="Phone / Call">
              {site.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block font-semibold text-navy hover:text-saffron">
                  {p}
                </a>
              ))}
            </ContactCard>

            <ContactCard icon="💬" title="WhatsApp">
              <a
                href={whatsappLink("Hello, I want admission counselling.")}
                target="_blank"
                className="font-semibold text-green-600 hover:underline"
              >
                Chat with us: {site.phones[0]}
              </a>
            </ContactCard>

            <ContactCard icon="✉" title="Email">
              {site.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block break-all font-semibold text-navy hover:text-saffron">
                  {e}
                </a>
              ))}
            </ContactCard>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Office location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-navy">Send us a Message</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill the form and our team will get back to you quickly.
            </p>
            <div className="mt-6">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-navy">{title}</h3>
        <div className="mt-1 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}
