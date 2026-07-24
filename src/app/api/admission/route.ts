import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  // Legacy / short form
  name?: string;
  qualification?: string;
  // Counselling form
  candidateName?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  dob?: string;
  fatherMobile?: string;
  address?: string;
  po?: string;
  ps?: string;
  dist?: string;
  category?: string;
  pin?: string;
  aadhar?: string;
  religion?: string;
  q10Board?: string; q10Year?: string; q10Marks?: string; q10Subjects?: string; q10Aggregate?: string;
  q12Board?: string; q12Year?: string; q12Marks?: string; q12Subjects?: string; q12Aggregate?: string;
  qGradBoard?: string; qGradYear?: string; qGradMarks?: string; qGradSubjects?: string; qGradAggregate?: string;
  session?: string;
  examThisYear?: string;
  rankThisYear?: string;
  examLastYear?: string;
  rankLastYear?: string;
  collegePreference?: string;
  statePreference?: string;
  expectedBudget?: string;
  // Shared
  phone?: string;
  email?: string;
  course?: string;
  city?: string;
  state?: string;
  wantsCreditCard?: boolean;
  agreeTerms?: boolean;
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

  const name = (data.candidateName || data.name || "").trim();
  const phone = (data.phone || "").trim();

  if (!name || !/^[0-9]{10}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid 10-digit phone are required." },
      { status: 422 }
    );
  }

  if (!data.agreeTerms) {
    return NextResponse.json(
      { ok: false, error: "Please accept the Terms & Conditions." },
      { status: 422 }
    );
  }

  const city = (data.city || data.dist || "").trim();

  const d = (v?: string) => (v && v.trim() ? v.trim() : "-");
  const lines = [
    `New Admission / Counselling Form — ${site.brand}`,
    "",
    `Candidate:      ${name}`,
    `DOB:            ${d(data.dob)}`,
    `Father:         ${d(data.fatherName)}  (${d(data.fatherOccupation)})`,
    `Mother:         ${d(data.motherName)}  (${d(data.motherOccupation)})`,
    `Contact:        ${phone}`,
    `Father Mobile:  ${d(data.fatherMobile)}`,
    `Email:          ${d(data.email)}`,
    "",
    `Address:        ${d(data.address)}`,
    `P.O. / P.S.:    ${d(data.po)} / ${d(data.ps)}`,
    `Dist / State:   ${d(city)} / ${d(data.state)}`,
    `PIN:            ${d(data.pin)}`,
    `Category:       ${d(data.category)}    Religion: ${d(data.religion)}`,
    `Aadhar:         ${d(data.aadhar)}`,
    "",
    `10th:    ${d(data.q10Board)} | ${d(data.q10Year)} | ${d(data.q10Marks)} | ${d(data.q10Subjects)} | ${d(data.q10Aggregate)}%`,
    `12th:    ${d(data.q12Board)} | ${d(data.q12Year)} | ${d(data.q12Marks)} | ${d(data.q12Subjects)} | ${d(data.q12Aggregate)}%`,
    `10+2+3:  ${d(data.qGradBoard)} | ${d(data.qGradYear)} | ${d(data.qGradMarks)} | ${d(data.qGradSubjects)} | ${d(data.qGradAggregate)}%`,
    "",
    `Course:         ${d(data.course)}`,
    `Session:        ${d(data.session)}`,
    `Exam This Year: ${d(data.examThisYear)}  Rank: ${d(data.rankThisYear)}`,
    `Exam Last Year: ${d(data.examLastYear)}  Rank: ${d(data.rankLastYear)}`,
    `College Pref:   ${d(data.collegePreference)}`,
    `State Pref:     ${d(data.statePreference)}`,
    `Expected Budget:${d(data.expectedBudget)}`,
    `Credit Card:    ${data.wantsCreditCard ? "YES — wants Bihar Student Credit Card help" : "No"}`,
    `Message:        ${d(data.message)}`,
    `Terms Accepted: ${data.agreeTerms ? "Yes" : "No"}`,
    `Source:         ${data.source || "Website"}`,
    `Time:           ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
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
      // Keep metadata flat (scalar values) so the CRM lead detail renders each
      // field cleanly. Drop empty values to avoid clutter.
      const rawMeta: Record<string, unknown> = {
        course: data.course,
        session: data.session,
        date_of_birth: data.dob,
        father_name: data.fatherName,
        father_occupation: data.fatherOccupation,
        mother_name: data.motherName,
        mother_occupation: data.motherOccupation,
        father_mobile: data.fatherMobile,
        address: data.address,
        post_office: data.po,
        police_station: data.ps,
        pin: data.pin,
        category: data.category,
        religion: data.religion,
        aadhar: data.aadhar,
        class_10_board: data.q10Board,
        class_10_year: data.q10Year,
        class_10_marks: data.q10Marks,
        class_10_subjects: data.q10Subjects,
        class_10_aggregate: data.q10Aggregate,
        class_12_board: data.q12Board,
        class_12_year: data.q12Year,
        class_12_marks: data.q12Marks,
        class_12_subjects: data.q12Subjects,
        class_12_aggregate: data.q12Aggregate,
        graduation_board: data.qGradBoard,
        graduation_year: data.qGradYear,
        graduation_marks: data.qGradMarks,
        graduation_subjects: data.qGradSubjects,
        graduation_aggregate: data.qGradAggregate,
        exam_this_year: data.examThisYear,
        rank_this_year: data.rankThisYear,
        exam_last_year: data.examLastYear,
        rank_last_year: data.rankLastYear,
        college_preference: data.collegePreference,
        state_preference: data.statePreference,
        expected_budget: data.expectedBudget,
        qualification: data.qualification,
        message: data.message,
        wants_credit_card: !!data.wantsCreditCard,
        terms_accepted: !!data.agreeTerms,
        form_source: data.source || "Website",
      };
      const metadata = Object.fromEntries(
        Object.entries(rawMeta).filter(([, v]) =>
          typeof v === "boolean" ? true : v !== undefined && v !== null && String(v).trim() !== ""
        )
      );
      const { error } = await supabase.from("leads").insert({
        full_name: name,
        phone,
        email: data.email?.trim() || null,
        city: city || null,
        state: data.state?.trim() || null,
        source: "website",
        metadata,
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
