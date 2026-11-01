import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactDialogHost from "./components/ContactDialogHost";
import FloatingNav from "./components/FloatingNav";
import Footer from "./components/Footer";
import ButtonGlow from "./components/ButtonGlow";
import PageTranslator from "./components/PageTranslator";
import HeadingShine from "./components/HeadingShine";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rizviz International",
  description:
    "Rizviz builds software, AI, data, and cloud solutions around real business needs, from custom applications and DevOps to data engineering and ServiceNow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <ContactDialogHost />
        <FloatingNav />
        <HeadingShine />
        <PageTranslator />
        <ButtonGlow />
        <SmoothScroll />
      </body>
    </html>
  );
}
