# Meera Prakash Education Center — Website (Admission Guru)

Professional admission-consultancy website built with **Next.js 16 + Tailwind CSS**.

## Features
- Modern, mobile-friendly design (brand: navy + saffron/gold)
- Home, Courses (20+), **Bihar Student Credit Card** (dedicated focus page)
- Online **Admission Enquiry form** → emails your team + auto-reply to student + WhatsApp
- **Razorpay** online fee payment (UPI / Cards / Net Banking)
- Floating WhatsApp button, About & Contact pages with Google Map

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```

## Configuration (important)

### 1. Business details / courses
Everything (phone, email, address, course list) lives in **`src/lib/site.ts`**.
Edit that one file to update content — no coding needed elsewhere.

### 2. Logo
A placeholder logo is at `public/logo.svg`. To use your real circular logo:
- Save your logo image as **`public/logo.png`**
- In `src/components/Logo.tsx`, change `src="/logo.svg"` to `src="/logo.png"`

### 3. Email + Payment secrets
Copy `.env.example` to **`.env.local`** and fill in the values:
```bash
cp .env.example .env.local
```
- **Email (Gmail):** you must create a Gmail **App Password**
  (Google Account → Security → 2-Step Verification → App passwords).
  The normal Gmail password will NOT work.
- **Razorpay:** create an account at https://dashboard.razorpay.com,
  then Settings → API Keys → copy Key ID & Secret.

Until these are filled, the form still works (leads are logged to the server console)
and the payment page will show a friendly "not configured yet" message.

## Deploy (recommended: Vercel — free)
1. Push this folder to a GitHub repo.
2. Import it at https://vercel.com → New Project.
3. Add the same environment variables from `.env.local` in Vercel → Settings → Environment Variables.
4. Deploy. Connect your domain `admissionguru.com` in Vercel → Domains.

## Project structure
```
src/
  app/
    page.tsx                     Home
    courses/                     All courses
    bihar-student-credit-card/   BSCC focus page
    admission/                   Admission form page
    payment/                     Razorpay fee payment
    about/  contact/
    api/
      admission/route.ts         Form -> email + WhatsApp
      razorpay/order|verify/     Payment gateway
  components/                    Header, Footer, forms, etc.
  lib/site.ts                    <-- EDIT ALL BUSINESS INFO HERE
```
