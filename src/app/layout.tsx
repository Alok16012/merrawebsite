import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://admissionguru.com"),
  title: {
    default: `${site.name} | Admission Guru`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "admission in Bihar",
    "direct admission",
    "B.Tech admission Patna",
    "MBBS admission",
    "nursing admission Bihar",
    "Bihar Student Credit Card",
    "polytechnic admission",
    "ITI admission",
    "Admission Guru",
    "Meera Prakash Education Center",
  ],
  openGraph: {
    title: `${site.name} | Admission Guru`,
    description: site.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
