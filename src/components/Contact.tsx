'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/data';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio: ${fd.get('name')}`);
    const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`);
    window.location.href = `mailto:${site.social.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <section id="contact" className="section border-t border-[#1a1a1a]">
      <div className="container-main">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="display-lg mt-5">Let&apos;s work together.</h2>
            <p className="body-lg mx-auto mt-6 max-w-lg">
              Open to engineering roles, contract builds, and product collaborations.
            </p>
            <a
              href={`mailto:${site.social.email}`}
              className="nav-link mt-8 inline-flex items-center gap-2 text-[0.9375rem] text-white"
            >
              {site.social.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.08} className="mt-16 text-left">
            <form onSubmit={handleSubmit} className="space-y-8">
              <label className="block">
                <span className="meta">Name</span>
                <input name="name" required autoComplete="name" className="input-field mt-3" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="meta">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="input-field mt-3"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="meta">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="input-field mt-3 resize-none"
                  placeholder="Tell me about the project"
                />
              </label>
              <MagneticButton className="w-full sm:w-auto">Send message</MagneticButton>
              {status === 'sent' && <p className="text-[0.8125rem] text-zinc-500">Opening your email client…</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
