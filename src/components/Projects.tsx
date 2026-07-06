'use client';

import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { featuredProject, projects, ProjectCaseStudy } from '@/lib/data';
import { ProjectImage } from './ProjectMockup';
import { MobileApps } from './MobileApps';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';

function ProjectLinks({ project }: { project: ProjectCaseStudy }) {
  const links = [
    project.github && { href: project.github, label: 'Source', icon: Github },
    project.live && { href: project.live, label: 'Live', icon: ExternalLink },
    project.play && { href: project.play, label: 'Play Store', icon: ArrowUpRight },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <div className="mt-6 flex flex-wrap gap-5">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-ink"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  );
}

function CaseBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="meta">{label}</p>
      <p className="mt-2 text-[0.9375rem] leading-[1.6] text-secondary">{value}</p>
    </div>
  );
}

function TextRow({ project, index }: { project: ProjectCaseStudy; index: number }) {
  const href = project.live ?? project.github;
  return (
    <Reveal>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid items-baseline gap-x-8 gap-y-3 py-5 md:grid-cols-[auto_1fr_auto]"
      >
        <span className="font-mono text-[0.8125rem] text-subtle">
          {String(index).padStart(2, '0')}
        </span>

        <div className="md:max-w-3xl">
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-muted md:text-2xl">
              {project.name}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </div>
          <p className="mt-2 text-[0.9375rem] leading-[1.6] text-secondary">
            {project.solution}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {project.tech.map((t) => (
            <span key={t} className="chip-pill">
              {t}
            </span>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

export function Projects() {
  const textProjects = projects.filter((p) => !p.featured && p.category !== 'mobile');

  return (
    <section id="work" className="section">
      <div className="container-main">
        <SectionHeader
          label="Selected work"
          title="Case studies, not card grids"
          description="Each project is documented as a product decision — the constraint, the build, and the outcome."
        />

        <Reveal className="mt-8 md:mt-10">
          <article>
            <ProjectImage src={featuredProject.image} alt={featuredProject.imageAlt} />
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
              <div>
                <p className="meta">Featured · {featuredProject.category}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-ink md:text-[2.25rem] md:leading-[1.05]">
                  {featuredProject.name}
                </h3>
                <p className="body-md mt-4 max-w-md">{featuredProject.impact}</p>
                <ProjectLinks project={featuredProject} />
              </div>
              <div className="space-y-4">
                <CaseBlock label="Problem" value={featuredProject.problem} />
                <CaseBlock label="Solution" value={featuredProject.solution} />
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <p className="meta">More builds</p>
          <div className="divide-line mt-3 divide-y">
            {textProjects.map((project, i) => (
              <TextRow key={project.slug} project={project} index={i + 1} />
            ))}
          </div>
        </div>

        <MobileApps />
      </div>
    </section>
  );
}
