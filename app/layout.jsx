import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Hero from "@/components/Hero";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto p-4">
          <Hero />
          {children}
        </div>
      </body>
    </html>
  );
}
