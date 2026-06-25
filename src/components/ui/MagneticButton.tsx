'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { transition } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
};

export function MagneticButton({ children, className = '', href, onClick, variant = 'primary', size = 'md' }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  const sizes = {
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-sm',
  };

  const base = `inline-flex items-center justify-center gap-2 rounded-lg font-medium ${sizes[size]}`;
  const variants = {
    primary: 'bg-zinc-950 text-white hover:bg-zinc-800',
    secondary: 'border border-[#e0e0e0] bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50',
    ghost: 'text-zinc-500 hover:text-zinc-950',
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const style = { x: sx, y: sy };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={style}
        className={cls}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.985 }}
        transition={transition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={style}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.985 }}
      transition={transition}
    >
      {children}
    </motion.button>
  );
}
