'use client';

import { motion } from 'framer-motion';
import { certifications, timeline } from '@/lib/data';
import { transition } from '@/lib/utils';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

const typeColors: Record<string, string> = {
  work: 'bg-white',
  project: 'bg-blue-400',
  education: 'bg-violet-400',
  milestone: 'bg-amber-400',
  goal: 'bg-emerald-400',
};

export function Journey() {
  return (
    <section id="journey" className="border-t border-zinc-800/80 bg-zinc-950/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Journey</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-white">
            Experience & milestones
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <Stagger className="relative">
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-zinc-800" aria-hidden />
            {timeline.map((item, i) => (
              <StaggerItem key={`${item.title}-${i}`} className="relative pl-10 pb-12 last:pb-0">
                <motion.div
                  className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[#09090b] ${typeColors[item.type] ?? 'bg-zinc-500'}`}
                  whileHover={{ scale: 1.2 }}
                  transition={transition}
                />
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-zinc-800 bg-[#09090b] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Credentials</h3>
              <ul className="mt-6 space-y-5">
                {certifications.map((c) => (
                  <li key={c.title} className="border-b border-zinc-800/80 pb-5 last:border-0 last:pb-0">
                    <p className="font-medium text-white">{c.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {c.provider} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
