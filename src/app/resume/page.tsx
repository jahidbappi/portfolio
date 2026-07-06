import type { Metadata } from 'next';
import Link from 'next/link';
import {
  resumeCertifications,
  resumeContact,
  resumeEducation,
  resumeExperience,
  resumeMeta,
  resumeProjects,
  resumeSkills,
  resumeSummary,
} from '@/lib/resume-content';
import { DownloadResumeButton } from '@/components/ui/DownloadResumeButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import './resume.css';

export const metadata: Metadata = {
  title: 'Resume — Jahid Bappi',
  robots: { index: false, follow: false },
};

function ContactLine() {
  const { email, location, github, linkedin, portfolio } = resumeContact;
  const items = [
    { text: email, href: `mailto:${email}` },
    { text: location },
    { text: github, href: `https://${github}` },
    { text: linkedin, href: `https://${linkedin}` },
    { text: portfolio, href: resumeMeta.portfolioUrl },
  ];

  return (
    <p className="resume-contact">
      {items.map((item, i) => (
        <span key={item.text}>
          {i > 0 ? <span className="resume-contact-sep"> | </span> : null}
          {item.href ? (
            <a href={item.href}>{item.text}</a>
          ) : (
            <span>{item.text}</span>
          )}
        </span>
      ))}
    </p>
  );
}

export default function ResumePage() {
  const contact = resumeContact;

  return (
    <div className="resume-page">
      <div className="resume-toolbar no-print">
        <Link href="/" className="resume-back">
          ← Back to portfolio
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DownloadResumeButton size="md" />
        </div>
      </div>

      <article className="resume-sheet">
        <header className="resume-header">
          <h1>{contact.name}</h1>
          <p className="resume-title">{contact.title}</p>
          <ContactLine />
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p className="resume-summary">{resumeSummary}</p>
        </section>

        <section>
          <h2>Professional Experience</h2>
          {resumeExperience.map((item) => (
            <div key={`${item.role}-${item.organization}-${item.period}`} className="resume-entry">
              <div className="resume-entry-head">
                <h3>
                  {item.role}
                  <span className="resume-org"> · {item.organization}</span>
                </h3>
                <span>{item.period}</span>
              </div>
              <ul className="resume-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected Projects</h2>
          {resumeProjects.map((project) => (
            <div key={project.name} className="resume-entry">
              <div className="resume-entry-head">
                <h3>
                  {project.link ? (
                    <a href={project.link} className="resume-project-link">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <span className="resume-tech">{project.tech}</span>
              </div>
              <ul className="resume-bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Technical Skills</h2>
          <dl className="resume-skills">
            {resumeSkills.map((group) => (
              <div key={group.label} className="resume-skill-row">
                <dt>{group.label}</dt>
                <dd>{group.skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Education</h2>
          {resumeEducation.map((edu) => (
            <div key={`${edu.program}-${edu.period}`} className="resume-entry">
              <div className="resume-entry-head">
                <h3>{edu.program}</h3>
                <span>{edu.period}</span>
              </div>
              <p className="resume-subtext">{edu.institution}</p>
              {edu.bullets ? (
                <ul className="resume-bullets">
                  {edu.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>

        <section>
          <h2>Certifications</h2>
          {resumeCertifications.map((cert) => (
            <div key={cert.title} className="resume-cert">
              <div>
                <h3>{cert.title}</h3>
                <p>{cert.provider}</p>
              </div>
              {cert.year ? <span>{cert.year}</span> : null}
            </div>
          ))}
        </section>
      </article>
    </div>
  );
}
