// Central configuration for Meera Prakash Education Center Pvt. Ltd.
// Edit this file to update contact details, courses, etc.

export const site = {
  name: "Meera Prakash Education Center Pvt. Ltd.",
  shortName: "Meera Prakash Education Center",
  brand: "Admission Guru",
  domain: "admissionguru.com",
  tagline: "Get Direct & Confirm Admission",
  subTagline: "100% Placement Guaranteed Colleges • Low Fee • Easy Instalments",
  regNo: "U80900BR2022PTC058594",
  description:
    "Meera Prakash Education Center Pvt. Ltd. (Admission Guru) helps students across Bihar and India get direct and confirmed admission into top colleges — engineering, medical, nursing, pharmacy, agriculture, teaching and ITI — with low fees and easy instalments.",
  address: {
    line1: "Sahganj, Professor Colony",
    line2: "Near SBI ATM, Patna - 800006, Bihar",
    city: "Patna",
    state: "Bihar",
    pincode: "800006",
  },
  phones: ["8709165052", "9801445739", "8709483155"],
  whatsapp: "918709165052", // primary WhatsApp (with country code, no +)
  emails: ["meeraprakasheducation@gmail.com", "admissionguru.com20@gmail.com"],
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export type Course = {
  name: string;
  slug: string;
  category: string;
  duration: string;
  eligibility: string;
  blurb: string;
};

export const courseCategories = [
  "Engineering & Technical",
  "Medical & Paramedical",
  "Agriculture & Science",
  "Teaching (B.Ed / D.El.Ed)",
  "ITI & Diploma",
  "Library Science",
] as const;

export const courses: Course[] = [
  // Engineering & Technical
  {
    name: "B.Tech",
    slug: "b-tech",
    category: "Engineering & Technical",
    duration: "4 Years",
    eligibility: "10+2 with PCM",
    blurb: "Bachelor of Technology in CSE, ME, EE, Civil and more from AICTE-approved colleges.",
  },
  {
    name: "M.Tech",
    slug: "m-tech",
    category: "Engineering & Technical",
    duration: "2 Years",
    eligibility: "B.Tech / B.E.",
    blurb: "Postgraduate engineering specialisations for career growth and research.",
  },
  {
    name: "Polytechnic (Diploma)",
    slug: "polytechnic",
    category: "Engineering & Technical",
    duration: "3 Years",
    eligibility: "10th Passed",
    blurb: "Diploma in Engineering — a fast, affordable route into the technical workforce.",
  },
  // Medical & Paramedical
  {
    name: "MBBS",
    slug: "mbbs",
    category: "Medical & Paramedical",
    duration: "5.5 Years",
    eligibility: "10+2 PCB + NEET",
    blurb: "Bachelor of Medicine & Surgery admission guidance for NEET-qualified students.",
  },
  {
    name: "BAMS (Ayurveda)",
    slug: "bams",
    category: "Medical & Paramedical",
    duration: "5.5 Years",
    eligibility: "10+2 PCB + NEET",
    blurb: "Bachelor of Ayurvedic Medicine & Surgery in recognised Ayurveda colleges.",
  },
  {
    name: "BHMS (Homeopathy)",
    slug: "bhms",
    category: "Medical & Paramedical",
    duration: "5.5 Years",
    eligibility: "10+2 PCB + NEET",
    blurb: "Bachelor of Homeopathic Medicine & Surgery admission support.",
  },
  {
    name: "B.Sc Nursing",
    slug: "nursing",
    category: "Medical & Paramedical",
    duration: "4 Years",
    eligibility: "10+2 PCB",
    blurb: "Professional nursing degree with strong hospital placement opportunities.",
  },
  {
    name: "ANM",
    slug: "anm",
    category: "Medical & Paramedical",
    duration: "2 Years",
    eligibility: "10+2",
    blurb: "Auxiliary Nurse Midwifery — a quick entry into the healthcare sector.",
  },
  {
    name: "GNM",
    slug: "gnm",
    category: "Medical & Paramedical",
    duration: "3 Years",
    eligibility: "10+2",
    blurb: "General Nursing & Midwifery diploma with clinical training.",
  },
  {
    name: "Pharmacy (D.Pharm / B.Pharm)",
    slug: "pharmacy",
    category: "Medical & Paramedical",
    duration: "2-4 Years",
    eligibility: "10+2 PCM/PCB",
    blurb: "Diploma and degree pharmacy programmes for the growing pharma industry.",
  },
  // Agriculture & Science
  {
    name: "B.Sc Agriculture",
    slug: "bsc-agriculture",
    category: "Agriculture & Science",
    duration: "4 Years",
    eligibility: "10+2 (Science/Agri)",
    blurb: "Bachelor of Science in Agriculture with government & private career scope.",
  },
  {
    name: "B.Sc (General)",
    slug: "bsc",
    category: "Agriculture & Science",
    duration: "3 Years",
    eligibility: "10+2 Science",
    blurb: "Bachelor of Science in PCM, PCB, IT and other streams.",
  },
  // Teaching
  {
    name: "B.Ed",
    slug: "b-ed",
    category: "Teaching (B.Ed / D.El.Ed)",
    duration: "2 Years",
    eligibility: "Graduation",
    blurb: "Bachelor of Education for a career in teaching.",
  },
  {
    name: "D.El.Ed",
    slug: "d-el-ed",
    category: "Teaching (B.Ed / D.El.Ed)",
    duration: "2 Years",
    eligibility: "10+2",
    blurb: "Diploma in Elementary Education for primary-school teaching.",
  },
  {
    name: "B.Sc B.Ed / BA B.Ed",
    slug: "bsc-bed",
    category: "Teaching (B.Ed / D.El.Ed)",
    duration: "4 Years",
    eligibility: "10+2",
    blurb: "Integrated teaching degrees that combine graduation with B.Ed.",
  },
  {
    name: "M.Ed",
    slug: "m-ed",
    category: "Teaching (B.Ed / D.El.Ed)",
    duration: "2 Years",
    eligibility: "B.Ed",
    blurb: "Master of Education for leadership roles in education.",
  },
  {
    name: "B.P.Ed",
    slug: "b-ped",
    category: "Teaching (B.Ed / D.El.Ed)",
    duration: "2 Years",
    eligibility: "Graduation",
    blurb: "Bachelor of Physical Education for sports & physical training careers.",
  },
  // ITI & Diploma
  {
    name: "ITI (All Trades)",
    slug: "iti",
    category: "ITI & Diploma",
    duration: "1-2 Years",
    eligibility: "8th / 10th",
    blurb: "Industrial Training in electrician, fitter, COPA, welder and more.",
  },
  // Library Science
  {
    name: "B.Lib (B.Lis)",
    slug: "b-lis",
    category: "Library Science",
    duration: "1 Year",
    eligibility: "Graduation",
    blurb: "Bachelor of Library & Information Science.",
  },
  {
    name: "M.Lib (M.Lis)",
    slug: "m-lis",
    category: "Library Science",
    duration: "1 Year",
    eligibility: "B.Lib",
    blurb: "Master of Library & Information Science.",
  },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
