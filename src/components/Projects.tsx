'use client';

import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { featuredProject, projects, ProjectCaseStudy } from '@/lib/data';
import { ProjectMockup } from './ProjectMockup';
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
    <div className="mt-8 flex flex-wrap gap-5">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link inline-flex items-center gap-2 text-[0.8125rem] text-zinc-400 transition-colors hover:text-white"
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
    <div className="border-t border-[#1a1a1a] pt-6">
      <p className="meta">{label}</p>
      <p className="mt-3 text-[0.9375rem] leading-[1.65] text-zinc-300">{value}</p>
    </div>
  );
}

export function Projects() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section border-t border-[#1a1a1a]">
      <div className="container-main">
        <SectionHeader
          label="Selected work"
          title="Case studies, not card grids"
          description="Each project is documented as a product decision — the constraint, the build, and the outcome."
        />

        <Reveal className="mt-20">
          <article>
            <ProjectMockup project={featuredProject} featured className="w-full" />
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div>
                <p className="meta">Featured · {featuredProject.category}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                  {featuredProject.name}
                </h3>
                <ProjectLinks project={featuredProject} />
              </div>
              <div className="space-y-0">
                <CaseBlock label="Problem" value={featuredProject.problem} />
                <CaseBlock label="Solution" value={featuredProject.solution} />
                <CaseBlock label="Impact" value={featuredProject.impact} />
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-32 space-y-32">
          {rest.map((project, i) => (
            <Reveal key={project.slug}>
              <article
                className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <ProjectMockup project={project} />
                <div className="lg:pt-4">
                  <p className="meta">{project.category}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-[1.75rem]">
                    {project.name}
                  </h3>
                  <div className="mt-8 space-y-0">
                    <CaseBlock label="Problem" value={project.problem} />
                    <CaseBlock label="Solution" value={project.solution} />
                    <CaseBlock label="Impact" value={project.impact} />
                  </div>
                  <ProjectLinks project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <MobileApps />
      </div>
    </section>
  );
}
