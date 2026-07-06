import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Journey } from '@/components/Journey';
import { Contact } from '@/components/Contact';
import { heroGitHubStats } from '@/lib/data';

export default function HomePage() {
  const stats = heroGitHubStats;

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
