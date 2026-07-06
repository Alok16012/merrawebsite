"use client";

import { useState } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const presets = [500, 1000, 2000, 5000];

export default function PaymentBox() {
  const [amount, setAmount] = useState<number | "">(1000);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("Admission / Registration Fee");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, phone, purpose }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMsg(data.error || "Payment gateway is not set up yet. Please contact us to pay.");
        return;
      }

      if (!window.Razorpay) {
        setStatus("error");
        setMsg("Payment library failed to load. Please refresh and try again.");
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: site.name,
        description: purpose,
        order_id: data.orderId,
        prefill: { name, contact: phone },
        theme: { color: "#1b2a86" },
        handler: async (response: RazorpayResponse) => {
          const verify = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const vdata = await verify.json();
          if (vdata.ok) {
            setStatus("success");
            setMsg(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          } else {
            setStatus("error");
            setMsg("Payment could not be verified. If money was deducted, please contact us.");
          }
        },
      });
      rzp.open();
      setStatus("idle");
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again or contact us.");
    }
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="mt-3 text-xl font-bold text-green-700">Payment Successful</h3>
        <p className="mt-2 break-all text-sm text-slate-600">{msg}</p>
        <p className="mt-3 text-sm text-slate-500">
          Please keep this Payment ID safe. Our team will confirm shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <form onSubmit={pay} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Purpose</label>
          <select className={field} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option>Admission / Registration Fee</option>
            <option>Counselling Fee</option>
            <option>Course Fee Instalment</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Amount (₹)</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  amount === p
                    ? "bg-navy text-white"
                    : "border border-slate-300 text-slate-700 hover:border-navy"
                }`}
              >
                ₹{p}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1}
            required
            className={field}
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input required className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          <input
            required
            type="tel"
            pattern="[0-9]{10}"
            title="10-digit mobile number"
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile Number"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-saffron py-4 text-base font-bold text-white transition hover:bg-brandred disabled:opacity-60"
        >
          {status === "loading" ? "Please wait..." : `Pay Securely ₹${amount || 0}`}
        </button>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">{msg}</p>
        )}

        <p className="text-center text-xs text-slate-400">
          🔒 Secure payment via Razorpay — UPI, Cards, Net Banking &amp; Wallets.
        </p>
      </form>
    </>
  );
}
