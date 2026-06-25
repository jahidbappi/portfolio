'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ProjectImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-[#ececec] bg-zinc-50 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.18)]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1024}
        height={768}
        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
    </div>
  );
}
