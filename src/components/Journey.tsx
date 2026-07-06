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
    <section id="journey" className="section">
      <div className="container-main">
        <SectionHeader label="Trajectory" title="Experience & milestones" />

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              {timeline.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                    active === i ? 'tab-active' : 'text-muted hover:bg-surface-muted hover:text-ink'
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
                <StaggerItem key={item.title} className="border-b border-line py-5 first:pt-0 last:border-0">
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
                  className="min-h-[240px]"
                >
                  <TimelineEntry item={timeline[active]} large />
                </motion.div>
              </AnimatePresence>
            </div>

            <Reveal className="mt-8 border-t border-line pt-8">
              <p className="meta">Credentials</p>
              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {certifications.map((c) => (
                  <div key={c.title} className="bg-surface px-5 py-4">
                    <p className="text-[0.9375rem] font-medium text-ink">{c.title}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">
                      {c.provider}
                      {c.year ? ` · ${c.year}` : ''}
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
      <h3 className={`mt-3 font-semibold tracking-[-0.02em] text-ink ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
        {item.title}
      </h3>
      <p className={`mt-3 max-w-xl leading-[1.65] text-secondary ${large ? 'text-[0.9375rem]' : 'text-[0.8125rem]'}`}>
        {item.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[0.75rem] text-subtle">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
