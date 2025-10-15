import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers'; // Updated import
import Navbar from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Ronnie's Store - Premium Marketplace",
  description: 'Your premium shopping destination',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* Use the wrapper component */}
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}