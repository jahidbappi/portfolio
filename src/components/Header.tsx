'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { site } from '@/lib/data';
import { transition } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? 'border-b border-line bg-header backdrop-blur-xl' : ''
        }`}
      >
        <div className="container-main flex h-[4.25rem] items-center justify-between gap-3">
          <Link
            href="#home"
            className="min-w-0 truncate text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink"
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link text-[0.8125rem] text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <div className="flex shrink-0 items-center gap-2.5 md:hidden">
            <ThemeToggle className="h-11 w-11 shrink-0" />
            <button
              type="button"
              className="focus-ring relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:text-ink"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-40 bg-overlay backdrop-blur-md md:hidden"
          >
            <nav className="container-main flex h-full flex-col justify-center gap-2 pt-20">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    className="block py-4 text-3xl font-semibold tracking-[-0.03em] text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
