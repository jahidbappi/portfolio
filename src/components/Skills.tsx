'use client';

import { skillGroups } from '@/lib/data';
import { SectionHeader } from './ui/SectionHeader';
import { Stagger, StaggerItem } from './ui/Reveal';

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-main">
        <SectionHeader
          label="Capabilities"
          title="Stack, by discipline"
          description="Technologies I reach for when shipping production systems — grouped by responsibility, not proficiency theater."
        />

        <Stagger className="mt-20 divide-y divide-[#1a1a1a] border-y border-[#1a1a1a]">
          {skillGroups.map((group) => (
            <StaggerItem key={group.id} className="grid gap-6 py-8 md:grid-cols-[180px_1fr] md:items-start md:gap-12 md:py-10">
              <div>
                <p className="text-[0.9375rem] font-medium text-white">{group.label}</p>
                <p className="mt-1 text-[0.8125rem] text-zinc-600">{group.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[#1a1a1a] bg-[#0a0a0a] px-3 py-1.5 text-[0.8125rem] text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
