'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { featuredProject, mobileGroups, projects, ProjectCaseStudy } from '@/lib/data';
import { transition } from '@/lib/utils';
import { ProjectMockup } from './ProjectMockup';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

function CaseStudyLinks({ project }: { project: ProjectCaseStudy }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:scale-[1.02] hover:border-zinc-500 hover:text-white"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200"
        >
          <ExternalLink className="h-4 w-4" />
          Live demo
        </a>
      )}
      {project.play && (
        <a
          href={project.play}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-300 transition-all duration-200 hover:scale-[1.02] hover:border-emerald-600"
        >
          Google Play
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function CaseStudyMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{value}</p>
    </div>
  );
}

export function Projects() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Work</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-white">
            Product case studies
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Every project framed as a product decision — problem, solution, and measurable impact.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300">
              Featured
            </span>
          </div>
          <motion.article
            className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20"
            whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
            transition={transition}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-14">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{featuredProject.category}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {featuredProject.name}
                </h3>
                <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <CaseStudyMeta label="Problem" value={featuredProject.problem} />
                  <CaseStudyMeta label="Solution" value={featuredProject.solution} />
                  <CaseStudyMeta label="Impact" value={featuredProject.impact} />
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredProject.tech.map((t) => (
                    <span key={t} className="rounded-md border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <CaseStudyLinks project={featuredProject} />
              </div>
              <div className="border-t border-zinc-800 p-6 lg:border-l lg:border-t-0 lg:p-10">
                <ProjectMockup project={featuredProject} className="h-full min-h-[280px]" />
              </div>
            </div>
          </motion.article>
        </Reveal>

        <div className="mt-20 space-y-24">
          {rest.map((project, i) => (
            <Reveal key={project.slug}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">{project.name}</h3>
                  <div className="mt-8 space-y-5">
                    <CaseStudyMeta label="Problem" value={project.problem} />
                    <CaseStudyMeta label="Solution" value={project.solution} />
                    <CaseStudyMeta label="Impact" value={project.impact} />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-md border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <CaseStudyLinks project={project} />
                </div>
                <ProjectMockup project={project} />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400/80">Google Play</p>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">29 Android apps in production</h3>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Business platforms, games, and utilities — shipped under multiple publisher accounts on Google Play.
            </p>
            <Stagger className="mt-10 grid gap-8 md:grid-cols-3">
              {mobileGroups.map((group) => (
                <StaggerItem key={group.id}>
                  <h4 className="text-sm font-semibold text-white">{group.label}</h4>
                  <ul className="mt-4 space-y-2">
                    {group.projects.map((app) => (
                      <li key={app.name}>
                        <a
                          href={app.play}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-link group inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-white"
                        >
                          {app.name}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
