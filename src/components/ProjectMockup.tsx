'use client';

import { ProjectCaseStudy } from '@/lib/data';
import { cn } from '@/lib/utils';

const palettes: Record<string, string> = {
  vibeflow: 'from-violet-600/30 via-zinc-900 to-zinc-950',
  'code-reviewer-ai': 'from-blue-600/25 via-zinc-900 to-zinc-950',
  'identifier-tester': 'from-emerald-600/20 via-zinc-900 to-zinc-950',
  'smart-relief': 'from-rose-600/20 via-zinc-900 to-zinc-950',
  'mobile-portfolio': 'from-amber-600/20 via-zinc-900 to-zinc-950',
};

export function ProjectMockup({ project, className }: { project: ProjectCaseStudy; className?: string }) {
  const gradient = palettes[project.slug] ?? 'from-zinc-700/30 via-zinc-900 to-zinc-950';

  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950',
        className,
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute inset-x-6 top-6 rounded-lg border border-zinc-700/60 bg-zinc-900/80 p-4 backdrop-blur-sm">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{project.category}</p>
        <p className="mt-1 text-lg font-semibold text-white">{project.name}</p>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-sm leading-relaxed text-zinc-400 line-clamp-2">{project.solution}</p>
      </div>
    </div>
  );
}
