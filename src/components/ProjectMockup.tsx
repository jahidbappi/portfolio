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
        'group relative overflow-hidden rounded-2xl border border-line bg-surface-muted',
        className,
      )}
      style={{ boxShadow: 'var(--shadow-soft)' }}
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
