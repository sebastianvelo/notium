import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import LanguageProvider from "@/context/language/LanguageProvider";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora"
});

export const metadata: Metadata = {
  title: "Notium - Collaborative Note Taking",
  description: "Create and collaborate on notes with your team",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 dark:from-secondary-950 dark:via-primary-950 dark:to-secondary-950">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}