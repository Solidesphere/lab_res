import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LABORATOIRE D'ANALYSES MEDICALES EL-THIKA",
  description:
    "Analyses médicales générales et spécialisées, Analyses d'autoimmunité - Dr. BOUCHAREF Ep. Mounis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div className="bg-gradient-to-tr from-gray-100 via-blue-100 to-blue-300 min-h-screen">
          <div className="container mx-auto p-4">
            <Hero />
            {children}
            <Contact />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
