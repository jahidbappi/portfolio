'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { site } from '@/lib/data';
import { fadeUp, stagger, transition } from '@/lib/utils';
import { MagneticButton } from './ui/MagneticButton';

type GitHubStats = { repos: number; stars: number };

const socials = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'Email', href: `mailto:${site.social.email}` },
];

export function Hero({ stats }: { stats: GitHubStats }) {
  return (
    <section id="home" className="relative overflow-hidden pt-[7.5rem] pb-20 md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,640px)] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,255,255,0.06),transparent)]" />

      <div className="container-main relative">
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} transition={transition} className="mb-10 inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[0.8125rem] text-zinc-400">{site.availability}</span>
            </motion.div>

            <motion.p variants={fadeUp} transition={transition} className="text-[0.8125rem] text-zinc-500">
              {site.fullName}
            </motion.p>

            <motion.h1 variants={fadeUp} transition={transition} className="display-xl mt-4 max-w-[14ch]">
              Products engineered for production.
            </motion.h1>

            <motion.p variants={fadeUp} transition={transition} className="body-lg mt-8 max-w-xl">
              {site.description}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#work" size="lg">
                View projects
              </MagneticButton>
              <MagneticButton href={site.resumeUrl} variant="secondary" size="lg">
                Download resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="nav-link inline-flex items-center gap-1 text-[0.8125rem] text-zinc-500 transition-colors hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]">
              <Image src={site.profileImage} alt={site.fullName} fill className="object-cover" sizes="340px" priority />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.22 }}
          className="mt-20 grid gap-px border border-[#1a1a1a] bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: stats.repos, label: 'GitHub repositories' },
            { value: stats.stars, label: 'Stars earned' },
            { value: '29', label: 'Play Store apps' },
            { value: site.focus[0], label: 'Current focus' },
          ].map((item) => (
            <div key={item.label} className="bg-[#050505] px-6 py-7 md:px-8">
              <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{item.value}</p>
              <p className="mt-2 text-[0.8125rem] text-zinc-500">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
