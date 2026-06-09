import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Shopping Negotiator Agent | Live Voice Deal Negotiation",
  description: "Get real-time automated bargain matching and discount negotiations on Amazon, Flipkart, and Croma using our AI Agent video call simulator.",
  keywords: ["AI negotiator", "shopping assistant", "price match", "coupon finder", "autonomous retail"],
  authors: [{ name: "Shop Negotiator AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-grow flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
