'use client';

import { ProjectCaseStudy } from '@/lib/data';
import { cn } from '@/lib/utils';

const accents: Record<string, { bg: string; accent: string }> = {
  vibeflow: { bg: '#0c0a14', accent: '#8b5cf6' },
  'code-reviewer-ai': { bg: '#080c14', accent: '#3b82f6' },
  'identifier-tester': { bg: '#081410', accent: '#10b981' },
  'smart-relief': { bg: '#140808', accent: '#f43f5e' },
  'mobile-portfolio': { bg: '#141008', accent: '#f59e0b' },
};

export function ProjectMockup({
  project,
  className,
  featured = false,
}: {
  project: ProjectCaseStudy;
  className?: string;
  featured?: boolean;
}) {
  const theme = accents[project.slug] ?? { bg: '#0a0a0a', accent: '#737373' };

  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-[#1a1a1a]', featured ? 'rounded-2xl' : '', className)}
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate font-mono text-[10px] text-zinc-600">
          {project.live?.replace('https://', '') ?? project.github?.replace('https://github.com/', '') ?? project.name}
        </span>
      </div>

      <div className={cn('relative p-6 md:p-8', featured ? 'min-h-[320px] md:min-h-[420px]' : 'min-h-[240px] md:min-h-[280px]')}>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, ${theme.accent}, transparent 50%)`,
          }}
        />

        <div className="relative">
          <p className="meta">{project.category}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">{project.name}</p>
        </div>

        <div className="relative mt-8 space-y-3">
          {[project.problem, project.solution].map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-2 h-px w-6 shrink-0" style={{ backgroundColor: theme.accent }} />
              <p className="text-[0.8125rem] leading-relaxed text-zinc-400">{line}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded border border-white/[0.08] bg-black/20 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
