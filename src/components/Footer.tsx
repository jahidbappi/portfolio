import { site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row md:items-center lg:px-8">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <p>Designed & engineered with precision</p>
      </div>
    </footer>
  );
}
