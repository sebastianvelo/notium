import Navbar from '@/components/layout/navbar/Navbar';
import LanguageProvider from '@/context/language/LanguageProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import Footer from '@/components/layout/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NotesApp - Collaborative Note Taking',
  description: 'Create and collaborate on notes with your team',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}