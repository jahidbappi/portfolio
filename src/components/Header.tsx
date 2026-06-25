'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/data';
import { MagneticButton } from './ui/MagneticButton';
import { transition } from '@/lib/utils';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="#home" className="text-sm font-semibold tracking-tight text-white">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link text-sm text-zinc-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href="#contact" variant="secondary" className="!px-4 !py-2 text-xs">
            Get in touch
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="border-b border-zinc-800 bg-[#09090b] px-6 py-4 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-sm text-zinc-300"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
