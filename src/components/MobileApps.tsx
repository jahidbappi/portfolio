'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { mobileGroups } from '@/lib/data';
import { transition } from '@/lib/utils';
import { Reveal } from './ui/Reveal';

export function MobileApps() {
  const [active, setActive] = useState(mobileGroups[0].id);
  const group = mobileGroups.find((g) => g.id === active)!;

  return (
    <Reveal className="mt-32">
      <div className="border-t border-[#1a1a1a] pt-20">
        <p className="meta">Mobile</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          29 Android apps in production
        </h3>
        <p className="body-md mt-4 max-w-2xl">
          Business platforms, games, and utilities — shipped to Google Play with privacy-first, offline-capable architecture.
        </p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-[0.8125rem] transition-colors ${
                active === g.id
                  ? 'bg-white text-black'
                  : 'border border-[#1a1a1a] text-zinc-400 hover:text-white'
              }`}
            >
              {g.label}
              <span className="ml-2 text-zinc-500">{g.projects.length}</span>
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
            className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.projects.map((app) => (
              <a
                key={app.name}
                href={app.play}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3.5 transition-colors hover:border-[#2a2a2a] hover:bg-[#0d0d0d]"
              >
                <span className="text-[0.8125rem] text-zinc-300 group-hover:text-white">{app.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-zinc-300" />
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
