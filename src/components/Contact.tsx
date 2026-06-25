'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { site } from '@/lib/data';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio: ${fd.get('name')}`);
    const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`);
    window.location.href = `mailto:${site.social.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 md:p-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Contact</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
              Let&apos;s build something remarkable.
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Open to full-time roles, contract work, and ambitious product collaborations.
            </p>
            <a
              href={`mailto:${site.social.email}`}
              className="nav-link mt-8 inline-flex items-center gap-2 text-zinc-300 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {site.social.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-zinc-500">{site.social.location}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-zinc-500">Name</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-zinc-600"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-zinc-500">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-zinc-600"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-zinc-500">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-y rounded-xl border border-zinc-800 bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-zinc-600"
                />
              </label>
              <MagneticButton className="w-full">Send message</MagneticButton>
              {status === 'sent' && (
                <p className="text-sm text-emerald-400">Opening your email client…</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
