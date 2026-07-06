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

        <Stagger className="divide-line mt-8 divide-y md:mt-10">
          {skillGroups.map((group) => (
            <StaggerItem key={group.id} className="grid gap-4 py-5 md:grid-cols-[180px_1fr] md:items-start md:gap-8 md:py-6">
              <div>
                <p className="text-[0.9375rem] font-medium text-ink">{group.label}</p>
                <p className="mt-1 text-[0.8125rem] text-muted">{group.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
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
