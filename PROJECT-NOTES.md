# Meera Prakash Education Center — Website + Admission Guru CRM

**Project notes (updated: 19 July 2026)**

Ek hi project mein do cheezein hain:

1. **Public Website** — meeraweb (Home, Courses, Admission, Bihar Student Credit Card, Payment, About, Contact)
2. **Admission Guru CRM** — leads, students, fees, HRMS/payroll, associates, student portal (dusre project se laa kar Meera ke liye rebrand kiya gaya)

---

## 1. Login / Access

| Kya | Kahan | Kaun |
|---|---|---|
| Website | `/` (homepage) | Public |
| CRM (staff) login | `/crm` ya `/login` | Admin, telecaller, backend, counselor |
| Student portal | `/student/login` | Students (enrollment number se) |

**Admin login (pehla user):**
- Email: `meeraprakasheducation@gmail.com`
- Password: `Meera@CRM2026` ← **login karke turant badal lena**

**Naye staff/users banane ke liye:** CRM me login → **Settings → Users → Add User**

---

## 2. Supabase (Database)

- Project: `oaconighwyvnsbghlpng` (Meera ka apna alag Supabase — purane client se koi lena-dena nahi)
- Saari keys `.env.local` mein hain (ye file git mein NAHI jaati)
- `.env.example` mein template hai — naya setup karna ho to usko copy karke values bharo

**Database migrations:**
- Saari SQL files: `supabase/migrations/` (001 se 098 tak) — sab live DB pe lagi hui hain
- Fresh database banana ho to: `DATABASE_URL="postgres-wala-connection-string" node scripts/run-migrations.js`

**Seeded master data (Settings se edit kar sakte ho):**
- 21 Courses (B.Tech, MBBS, B.Sc Nursing, B.Ed, ITI... website wali list)
- 6 Departments (Engineering, Medical, Agriculture, Teaching, ITI, Library Science)
- 23 Universities/Boards (BEU, AKU, BUHS, BRABU, LNMU, NCVT, IGNOU...)
- 3 Sessions (2024-25, 2025-26, 2026-27)

---

## 3. Website form → CRM lead (automatic)

Website ke dono forms — **homepage Quick Enquiry** aur **Admission form** — submit hote hi:
1. CRM ke **Leads** mein naya lead ban jata hai (source: website; course/message metadata mein)
2. Email jaata hai team ko (SMTP configure hone pe)
3. WhatsApp notify link banta hai

---

## 4. Branding — sab Meera ka

- Logo: `public/brand-logo.png` (website ke logo.svg se bana) — login, sidebar, invoice, salary slip, sab pe
- Colors: logo ke hisaab se — navy `#1b2a86`, blue `#2f6fed`, gold `#f5b400`
- Invoice / Salary Slip / Dispatch receipt par: **MEERA PRAKASH EDUCATION CENTER**, Sahganj, Professor Colony, Near SBI ATM, Patna – 800006, Ph: 87091 65052, 98014 45739, meeraprakasheducation@gmail.com
- Enrollment number format: `MPEC-XXXXXX` | Invoice: `MPEC-INV-...`
- Purane client (DCW) ka naam, address, phone, Supabase, sab hata diya gaya hai

---

## 5. ⚠️ PENDING — Bank details (zaroori!)

Student portal ke **Accounts** page aur Associate portal pe fee payment ki bank details **abhi placeholder hain**
(purane client ka account hata diya gaya, naya abhi daala nahi).

Jaise hi Meera ki details milein, in 2 files mein update karna hai:
- `src/app/(crm)/student/(portal)/accounts/page.tsx`
- `src/app/(crm)/(dashboard)/associate/account/page.tsx`

Chahiye: Account Name, Account Number, IFSC, Bank & Branch, UPI ID

---

## 6. Deploy (Vercel)

1. Code GitHub pe push karo (Meera ka repo)
2. Vercel mein project import karo
3. **Environment Variables** mein `.env.local` ki saari values daalo:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Gmail App Password), `LEADS_TO_EMAIL`, `SMTP_FROM`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `CRON_SECRET` (koi bhi random string)
4. `vercel.json` mein daily cron already set hai (attendance auto punch-out)

---

## 7. Local development

```bash
npm install        # pehli baar
npm run dev        # http://localhost:3000
npm run build      # production build test
```

---

## 8. Common problems

**"Could not find the 'X' column ... in the schema cache"**
→ Purane project ke DB mein kuch columns manually bane the jo migrations mein nahi the.
Ab tak 2 mile aur fix hue: `lead_form_fields` table (migration 028a), `leads.extra_data` (migration 098).
Aisa error phir aaye to: nayi migration file banao jo missing column add kare, aur DB pe chala do.

**Website ka naya page add kiya, lekin wo login pe redirect ho raha hai**
→ `src/proxy.ts` kholo aur `SITE_PATHS` list mein us page ka path add karo.

**Email nahi ja raha**
→ `.env.local` mein `SMTP_PASS` Gmail ka **App Password** hona chahiye (normal password nahi chalta).
Google Account → Security → 2-Step Verification → App passwords.

---

## 9. Test data (delete kar dena)

CRM Leads mein 2 test leads padi hain:
- "Test Lead Website" (9876543210)
- "Rahul Kumar UI Test" (9123456780)
