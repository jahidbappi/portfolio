import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
  description:
    'Md. Jahidul Islam builds production web apps, AI tools, and 29+ Android products. Full-stack engineer specializing in React, Node.js, and system design.',
  metadataBase: new URL('https://jahidbappi.vercel.app'),
  openGraph: {
    title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
    description:
      'Production web apps, AI tools, and 29+ Android products shipped to real users.',
    url: 'https://jahidbappi.vercel.app',
    siteName: 'Jahid Bappi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
    description: 'Production web apps, AI tools, and 29+ Android products.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/assets/brand-icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
