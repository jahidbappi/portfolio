'use client';

import { FormEvent, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { site } from '@/lib/data';
import { Reveal } from './ui/Reveal';

const socialIcons = [
  { label: 'LinkedIn', href: site.social.linkedin, icon: Linkedin },
  { label: 'Medium', href: site.social.medium, icon: null },
  { label: 'X', href: site.social.twitter, icon: null },
];

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM20.96 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75 1.19 2.58 1.19 5.75z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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

  const contactRows = [
    {
      icon: Mail,
      label: site.social.email,
      href: `mailto:${site.social.email}`,
    },
    {
      icon: Github,
      label: `github.com/${site.githubUsername}`,
      href: site.social.github,
    },
    {
      icon: MapPin,
      label: site.social.location,
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container-main">
        <Reveal>
          <div className="contact-panel">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                  CONTACT
                </p>
                <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                  Let&apos;s build something remarkable.
                </h2>
                <p className="mt-4 max-w-sm text-[0.9375rem] leading-[1.65] text-secondary">
                  Open to roles, collaborations, and ambitious projects.
                </p>

                <ul className="mt-6 space-y-3">
                  {contactRows.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group inline-flex items-center gap-3 text-[0.9375rem] text-secondary transition-colors hover:text-ink"
                        >
                          <Icon className="h-[18px] w-[18px] shrink-0 text-accent" />
                          {label}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-3 text-[0.9375rem] text-secondary">
                          <Icon className="h-[18px] w-[18px] shrink-0 text-accent" />
                          {label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-2.5">
                  {socialIcons.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="social-icon-btn"
                    >
                      {Icon ? (
                        <Icon className="h-[18px] w-[18px]" />
                      ) : label === 'Medium' ? (
                        <MediumIcon className="h-[18px] w-[18px]" />
                      ) : (
                        <XIcon className="h-[18px] w-[18px]" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-[0.8125rem] text-muted">Name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="contact-input"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.8125rem] text-muted">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="contact-input"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.8125rem] text-muted">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="contact-input resize-none"
                    placeholder="Tell me about the project"
                  />
                </label>
                <button type="submit" className="contact-submit">
                  Send message
                  <Send className="h-4 w-4" />
                </button>
                {status === 'sent' && (
                  <p className="text-center text-[0.8125rem] text-muted">Opening your email client…</p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
