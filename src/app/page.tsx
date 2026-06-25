import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Journey } from '@/components/Journey';
import { Contact } from '@/components/Contact';
import { site } from '@/lib/data';

async function getGitHubStats() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.githubUsername}/repos?per_page=100`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error('GitHub fetch failed');
    const repos = await res.json();
    const excluded = new Set(['jahidbappi', 'Web-Technologies_Course-Tasks']);
    const clean = repos.filter(
      (r: { fork: boolean; name: string }) => !r.fork && !excluded.has(r.name),
    );
    return {
      repos: clean.length,
      stars: clean.reduce((s: number, r: { stargazers_count: number }) => s + r.stargazers_count, 0),
    };
  } catch {
    return { repos: 13, stars: 0 };
  }
}

export default async function HomePage() {
  const stats = await getGitHubStats();

  return (
    <>
      <Hero stats={stats} />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
    </>
  );
}
