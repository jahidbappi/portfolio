'use client';

import { Brain, Layout, Server, Smartphone, Wrench } from 'lucide-react';
import { skillGroups } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

const icons = {
  Layout,
  Server,
  Smartphone,
  Brain,
  Wrench,
} as const;

export function Skills() {
  return (
    <section id="skills" className="border-y border-zinc-800/80 bg-zinc-950/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Skills</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-white">
            The stack I operate in
          </h2>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Grouped by discipline — no vanity percentages, just tools I use in production.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon as keyof typeof icons];
            return (
              <StaggerItem
                key={group.id}
                className="rounded-2xl border border-zinc-800 bg-[#09090b] p-6 transition-all duration-200 hover:border-zinc-700 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <Icon className="h-4 w-4 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
