'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications, timeline } from '@/lib/data';
import { transition } from '@/lib/utils';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

export function Journey() {
  const [active, setActive] = useState(0);

  return (
    <section id="journey" className="section border-t border-[#ececec]">
      <div className="container-main">
        <SectionHeader label="Trajectory" title="Experience & milestones" />

        <div className="mt-16 grid gap-16 md:mt-20 lg:grid-cols-[280px_1fr] lg:gap-24">
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              {timeline.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                    active === i ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-950'
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-wider">{item.year}</p>
                  <p className="mt-1 text-[0.8125rem] font-medium">{item.title.split(' · ')[0]}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Stagger className="space-y-0 lg:hidden">
              {timeline.map((item) => (
                <StaggerItem key={item.title} className="border-b border-[#ececec] py-8 first:pt-0 last:border-0">
                  <TimelineEntry item={item} />
                </StaggerItem>
              ))}
            </Stagger>

            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={transition}
                  className="min-h-[280px]"
                >
                  <TimelineEntry item={timeline[active]} large />
                </motion.div>
              </AnimatePresence>
            </div>

            <Reveal className="mt-20 border-t border-[#ececec] pt-16">
              <p className="meta">Credentials</p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#ececec] bg-[#ececec] sm:grid-cols-2">
                {certifications.map((c) => (
                  <div key={c.title} className="bg-white px-6 py-5">
                    <p className="text-[0.9375rem] font-medium text-zinc-950">{c.title}</p>
                    <p className="mt-1 text-[0.8125rem] text-zinc-500">
                      {c.provider} · {c.year}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  item,
  large = false,
}: {
  item: (typeof timeline)[0];
  large?: boolean;
}) {
  return (
    <div>
      <p className="meta">{item.year}</p>
      <h3 className={`mt-4 font-semibold tracking-[-0.02em] text-zinc-950 ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
        {item.title}
      </h3>
      <p className={`mt-4 max-w-xl leading-[1.65] text-zinc-600 ${large ? 'text-[0.9375rem]' : 'text-[0.8125rem]'}`}>
        {item.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[0.75rem] text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
