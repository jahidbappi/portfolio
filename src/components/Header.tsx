'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/data';
import { transition } from '@/lib/utils';
import { MagneticButton } from './ui/MagneticButton';

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
          scrolled || open ? 'border-b border-[#1a1a1a] bg-[#050505]/90 backdrop-blur-xl' : ''
        }`}
      >
        <div className="container-main flex h-[4.25rem] items-center justify-between">
          <Link href="#home" className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-white">
            {site.name}
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link text-[0.8125rem] text-zinc-500 transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href="#contact" variant="secondary" size="md" className="!h-9 !px-4 !text-xs">
              Contact
            </MagneticButton>
          </div>

          <button
            type="button"
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={`absolute h-px w-5 bg-white transition-all ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute h-px w-5 bg-white transition-all ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-md md:hidden"
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
                    className="block py-4 text-3xl font-semibold tracking-[-0.03em] text-white"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: links.length * 0.04 }}
                className="mt-10"
              >
                <MagneticButton href="#contact" className="w-full" onClick={() => setOpen(false)}>
                  Get in touch
                </MagneticButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
