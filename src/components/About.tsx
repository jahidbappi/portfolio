'use client';

import { aboutBento } from '@/lib/data';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">About</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
            Engineering with intent, not templates.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            First, solve the problem. Then, write the code. I combine product thinking with full-stack execution —
            from database schema to pixel-perfect interfaces.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-3">
          {aboutBento.map((card) => (
            <StaggerItem
              key={card.id}
              className={`group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/40 ${card.span} border-l-2 ${card.accent}`}
            >
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
