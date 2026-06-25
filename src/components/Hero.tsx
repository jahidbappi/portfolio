'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';
import { heroStats, site } from '@/lib/data';
import { fadeUp, stagger, transition } from '@/lib/utils';
import { MagneticButton } from './ui/MagneticButton';

const socials = [
  { href: site.social.github, icon: Github, label: 'GitHub' },
  { href: site.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: site.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: `mailto:${site.social.email}`, icon: Mail, label: 'Email' },
];

type GitHubStats = { repos: number; stars: number };

export function Hero({ stats }: { stats: GitHubStats }) {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
          <motion.div variants={fadeUp} transition={transition} className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium tracking-wide text-zinc-300">{site.availability}</span>
          </motion.div>

          <motion.p variants={fadeUp} transition={transition} className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            {site.fullName}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={transition}
            className="text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
          >
            I build products
            <br />
            <span className="text-zinc-500">that ship to production.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            {site.description}
          </motion.p>

          <motion.div variants={fadeUp} transition={transition} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work">
              View Projects
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={site.resumeUrl} variant="secondary">
              Download Resume
              <Download className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={transition} className="mt-10 flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all duration-200 hover:scale-105 hover:border-zinc-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-4"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="bg-[#09090b] px-6 py-5">
              <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.28 }}
          className="mt-6 flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-zinc-700">
              <Image src={site.profileImage} alt={site.fullName} fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Currently focused on</p>
              <p className="text-sm text-zinc-500">{site.focus.join(' · ')}</p>
            </div>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-white">{stats.repos}</p>
              <p className="text-zinc-500">GitHub repos</p>
            </div>
            <div>
              <p className="font-medium text-white">{stats.stars}</p>
              <p className="text-zinc-500">Stars earned</p>
            </div>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link inline-flex items-center gap-1 self-center text-zinc-400 hover:text-white"
            >
              View GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
