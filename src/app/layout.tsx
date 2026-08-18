import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
  description:
    'Md. Jahidul Islam builds production web apps, AI tools, and 200+ Android apps and games on Google Play. Full-stack engineer specializing in React, Node.js, and system design.',
  metadataBase: new URL('https://jahidbappi.vercel.app'),
  openGraph: {
    title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
    description:
      'Production web apps, AI tools, and 200+ Android apps and games shipped on Google Play.',
    url: 'https://jahidbappi.vercel.app',
    siteName: 'Jahid Bappi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jahid Bappi — Full-Stack Engineer & AI Builder',
    description: 'Production web apps, AI tools, and 200+ Android apps and games on Google Play.',
  },
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.querySelector('meta[name="theme-color"]')?.setAttribute('content',d?'#09090b':'#ffffff')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/brand-icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#ffffff" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
