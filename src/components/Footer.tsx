import { site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <div className="container-main flex flex-col gap-3 text-[0.8125rem] text-zinc-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <p>{site.social.location}</p>
      </div>
    </footer>
  );
}
