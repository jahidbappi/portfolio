'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { playStoreAppCount, site } from '@/lib/data';
import { fadeUp, stagger, transition } from '@/lib/utils';
import { MagneticButton } from './ui/MagneticButton';
import { ProfilePortrait } from './ProfilePortrait';

type HeroGitHubStats = { repos: string; stars: string };

const socials = [
  { label: 'GitHub', href: site.social.github, icon: Github, iconHover: 'group-hover:text-ink' },
  { label: 'LinkedIn', href: site.social.linkedin, icon: Linkedin, iconHover: 'group-hover:text-brand-linkedin' },
  { label: 'Email', href: `mailto:${site.social.email}`, icon: Mail, iconHover: 'group-hover:text-ink' },
] as const;

export function Hero({ stats }: { stats: HeroGitHubStats }) {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-10 md:pt-32 md:pb-12">
      <div className="container-main relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-2.5 pr-3.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-online opacity-60"
                  aria-hidden
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-online" aria-hidden />
              </span>
              <span className="text-[0.8125rem] text-secondary">{site.availability}</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-4 text-[0.8125rem] font-medium tracking-[0.02em] text-muted"
            >
              {site.fullName}
            </motion.p>

            <motion.h1 variants={fadeUp} transition={transition} className="display-xl max-w-[15ch]">
              Where ideas meet production.
            </motion.h1>

            <motion.div variants={fadeUp} transition={transition} className="mt-6 lg:hidden">
              <ProfilePortrait variant="simple" />
            </motion.div>

            <motion.p variants={fadeUp} transition={transition} className="body-lg mt-5 max-w-xl">
              {site.description}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#work" size="lg">
                View projects
              </MagneticButton>
              <MagneticButton href={site.resumeUrl} variant="secondary" size="lg">
                View resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition} className="mt-8 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon, iconHover }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.8125rem] text-muted transition-all duration-200 hover:border-line-strong hover:bg-surface-muted hover:text-ink"
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 transition-colors ${iconHover}`} aria-hidden />
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden lg:block">
            <ProfilePortrait />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.22 }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
        >
          {[
            { value: stats.repos, label: 'GitHub repositories' },
            { value: stats.stars, label: 'Stars earned' },
            { value: `${playStoreAppCount}+`, label: 'Play Store apps' },
            { value: site.focus[0], label: 'Current focus' },
          ].map((item) => (
            <div key={item.label} className="bg-surface px-4 py-4 md:px-5">
              <p className="text-[1.625rem] font-semibold tracking-[-0.03em] text-ink">{item.value}</p>
              <p className="mt-1 text-[0.8125rem] text-muted">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
