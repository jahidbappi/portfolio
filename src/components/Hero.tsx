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
    <section id="home" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="container-main relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_320px] lg:gap-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-[#ececec] bg-white py-1.5 pl-2.5 pr-3.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[0.8125rem] text-zinc-600">{site.availability}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} transition={transition} className="display-xl max-w-[15ch]">
              Products engineered for production.
            </motion.h1>

            <motion.p variants={fadeUp} transition={transition} className="body-lg mt-7 max-w-xl">
              {site.description}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#work" size="lg">
                View projects
              </MagneticButton>
              <MagneticButton href={site.resumeUrl} variant="secondary" size="lg">
                Download resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition} className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="nav-link inline-flex items-center gap-1 text-[0.8125rem] text-zinc-500 transition-colors hover:text-zinc-950"
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#ececec] bg-zinc-50">
              <Image src={site.profileImage} alt={site.fullName} fill className="object-cover" sizes="320px" priority />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.22 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#ececec] bg-[#ececec] lg:grid-cols-4"
        >
          {[
            { value: stats.repos, label: 'GitHub repositories' },
            { value: stats.stars, label: 'Stars earned' },
            { value: '29', label: 'Play Store apps' },
            { value: site.focus[0], label: 'Current focus' },
          ].map((item) => (
            <div key={item.label} className="bg-white px-6 py-7 md:px-8">
              <p className="text-[1.75rem] font-semibold tracking-[-0.03em] text-zinc-950">{item.value}</p>
              <p className="mt-1.5 text-[0.8125rem] text-zinc-500">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
