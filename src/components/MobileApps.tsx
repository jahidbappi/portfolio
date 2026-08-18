'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { mobileGroups, playStoreAppCount } from '@/lib/data';
import { transition } from '@/lib/utils';
import { Reveal } from './ui/Reveal';

function iconFor(play: string) {
  const id = play.split('id=')[1]?.split('&')[0];
  return `/assets/apps/${id}.png`;
}

export function MobileApps() {
  const visibleGroups = mobileGroups.filter((group) => group.projects.length > 0);
  const [active, setActive] = useState(visibleGroups[0].id);
  const group = visibleGroups.find((g) => g.id === active)!;

  return (
    <Reveal className="mt-10 md:mt-12">
      <div>
        <p className="meta">Mobile</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink md:text-3xl">
          {playStoreAppCount}+ apps & games in production
        </h3>
        <p className="body-md mt-3 max-w-2xl">
          Business platforms, games, and utilities — a sample of 200+ apps and games on Google Play, built with privacy-first, offline-capable architecture.
        </p>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              className={`focus-ring shrink-0 rounded-lg px-4 py-2 text-[0.8125rem] transition-colors ${
                active === g.id ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {g.label}
              <span className="ml-2 opacity-60">{g.projects.length}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition}
            className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.projects.map((app) => (
              <a
                key={app.name}
                href={app.play}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center gap-3.5 px-3.5 py-3"
              >
                <Image
                  src={iconFor(app.play)}
                  alt={`${app.name} app icon`}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-[10px] border border-line"
                />
                <span className="min-w-0 flex-1 truncate text-[0.875rem] font-medium text-secondary group-hover:text-ink">
                  {app.name}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-ink" />
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
