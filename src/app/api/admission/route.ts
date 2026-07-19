import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  qualification?: string;
  city?: string;
  wantsCreditCard?: boolean;
  message?: string;
  source?: string;
};

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();

  if (!name || !/^[0-9]{10}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid 10-digit phone are required." },
      { status: 422 }
    );
  }

  const lines = [
    `New Admission Enquiry — ${site.brand}`,
    "",
    `Name:          ${name}`,
    `Phone:         ${phone}`,
    `Email:         ${data.email || "-"}`,
    `Course:        ${data.course || "-"}`,
    `Qualification: ${data.qualification || "-"}`,
    `City:          ${data.city || "-"}`,
    `Credit Card:   ${data.wantsCreditCard ? "YES — wants Bihar Student Credit Card help" : "No"}`,
    `Message:       ${data.message || "-"}`,
    `Source:        ${data.source || "Website"}`,
    `Time:          ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  ];
  const text = lines.join("\n");

  // Save the enquiry as a lead in the Admission Guru CRM (Supabase).
  // Non-fatal: email/WhatsApp flow continues even if the insert fails.
  let crmSaved = false;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey);
      const { error } = await supabase.from("leads").insert({
        full_name: name,
        phone,
        email: data.email?.trim() || null,
        city: data.city?.trim() || null,
        source: "website",
        metadata: {
          course: data.course || null,
          qualification: data.qualification || null,
          message: data.message || null,
          wants_credit_card: !!data.wantsCreditCard,
          form_source: data.source || "Website",
        },
      });
      if (error) console.error("CRM lead insert failed:", error.message);
      else crmSaved = true;
    } catch (err) {
      console.error("CRM lead insert failed:", err);
    }
  } else {
    console.warn("Supabase not configured — lead not saved to CRM.");
  }

  // WhatsApp "click to notify" link the team can use (works without paid API).
  const waMessage = encodeURIComponent(text);
  const waNotifyLink = `https://wa.me/${site.whatsapp}?text=${waMessage}`;

  // Try to email the team if SMTP is configured.
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEADS_TO_EMAIL || site.emails[0];

  let emailed = false;
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE ?? "true") === "true",
        auth: { user, pass },
      });

      // Notify the institute
      await transporter.sendMail({
        from: `"${site.brand} Website" <${user}>`,
        to,
        replyTo: data.email || undefined,
        subject: `New Admission Enquiry: ${name} — ${data.course || "Course"}`,
        text,
      });

      // Auto-reply to the student (if they gave an email)
      if (data.email) {
        await transporter.sendMail({
          from: `"${site.name}" <${user}>`,
          to: data.email,
          subject: `Thank you for your enquiry — ${site.brand}`,
          text: [
            `Dear ${name},`,
            "",
            `Thank you for contacting ${site.name} (${site.brand}).`,
            `We have received your enquiry for: ${data.course || "admission"}.`,
            "",
            "Our counsellor will call you soon. For faster help, WhatsApp/call us:",
            `Phone: ${site.phones.join(", ")}`,
            "",
            "Warm regards,",
            site.name,
            `${site.address.line1}, ${site.address.line2}`,
          ].join("\n"),
        });
      }
      emailed = true;
    } catch (err) {
      console.error("Email send failed:", err);
    }
  } else {
    console.warn("SMTP not configured — logging lead only.");
    console.log(text);
  }

  return NextResponse.json({ ok: true, emailed, crmSaved, waNotifyLink });
}
