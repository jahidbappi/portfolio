'use client';

import { aboutBento } from '@/lib/data';
import { SectionHeader } from './ui/SectionHeader';
import { Stagger, StaggerItem } from './ui/Reveal';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-main">
        <SectionHeader
          label="About"
          title="Builder mindset. Product discipline."
          description="I approach engineering as product work — clarity of problem, restraint in solution, precision in execution."
        />

        <Stagger className="mt-8 grid gap-3 md:mt-10 md:grid-cols-6">
          {aboutBento.map((card) => (
            <StaggerItem
              key={card.id}
              className={`card card-hover p-5 md:p-6 ${card.span} ${card.featured ? 'md:min-h-[220px] bg-surface-muted' : ''}`}
            >
              <p className="meta">{card.index}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">{card.title}</h3>
              <p className={`mt-2.5 text-[0.9375rem] leading-[1.65] text-secondary ${card.featured ? 'max-w-md' : ''}`}>
                {card.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
