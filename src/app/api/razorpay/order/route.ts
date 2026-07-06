import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { ok: false, error: "Payment gateway not configured yet." },
      { status: 503 }
    );
  }

  let body: { amount?: number; name?: string; phone?: string; purpose?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!amount || amount < 1) {
    return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 422 });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        name: body.name || "",
        phone: body.phone || "",
        purpose: body.purpose || "Admission Fee",
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not create payment order." },
      { status: 500 }
    );
  }
}
