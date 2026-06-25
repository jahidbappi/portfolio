import { site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-[#ececec] py-12">
      <div className="container-main flex flex-col gap-3 text-[0.8125rem] text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <p>{site.social.location}</p>
      </div>
    </footer>
  );
}
