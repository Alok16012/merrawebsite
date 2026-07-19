import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PaymentBox from "@/components/PaymentBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fee Payment",
  description:
    "Pay your admission, counselling or course fee online securely via UPI, cards and net banking with Meera Prakash Education Center.",
};

export default function PaymentPage() {
  return (
    <>
      <PageHeader
        badge="🔒 100% Secure Payment"
        title="Online Fee Payment"
        subtitle="Pay your registration, counselling or course fee instantly and safely."
      />

      <section className="container-wrap py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-navy">Make a Payment</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your details and the amount as told by our counsellor.
            </p>
            <div className="mt-6">
              <PaymentBox />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h3 className="text-lg font-bold">Accepted Payment Methods</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>✔ UPI (Google Pay, PhonePe, Paytm)</li>
                <li>✔ Debit &amp; Credit Cards</li>
                <li>✔ Net Banking</li>
                <li>✔ Wallets</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-navy">Need help paying?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Call us before paying if you are unsure about the amount.
              </p>
              <div className="mt-3 space-y-1 text-sm font-semibold text-navy">
                {site.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="block hover:text-saffron">
                    📞 {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              ⚠ Always confirm the amount with our official numbers before paying. Keep your
              Payment ID / receipt safe after a successful transaction.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
