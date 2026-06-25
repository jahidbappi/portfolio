'use client';

import { aboutBento } from '@/lib/data';
import { SectionHeader } from './ui/SectionHeader';
import { Stagger, StaggerItem } from './ui/Reveal';

export function About() {
  return (
    <section id="about" className="section border-t border-[#ececec]">
      <div className="container-main">
        <SectionHeader
          label="About"
          title="Builder mindset. Product discipline."
          description="I approach engineering as product work — clarity of problem, restraint in solution, precision in execution."
        />

        <Stagger className="mt-16 grid gap-3 md:mt-20 md:grid-cols-6">
          {aboutBento.map((card) => (
            <StaggerItem
              key={card.id}
              className={`card card-hover p-7 md:p-8 ${card.span} ${card.featured ? 'md:min-h-[260px] bg-zinc-50' : ''}`}
            >
              <p className="meta">{card.index}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-zinc-950 md:text-xl">{card.title}</h3>
              <p className={`mt-3 text-[0.9375rem] leading-[1.65] text-zinc-600 ${card.featured ? 'max-w-md' : ''}`}>
                {card.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
