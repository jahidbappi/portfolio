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
};

export function MagneticButton({ children, className = '', href, onClick, variant = 'primary' }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-white text-black hover:bg-zinc-200',
    secondary: 'border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800',
    ghost: 'text-zinc-400 hover:text-white',
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
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
        whileTap={{ scale: 0.98 }}
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
      whileTap={{ scale: 0.98 }}
      transition={transition}
    >
      {children}
    </motion.button>
  );
}
