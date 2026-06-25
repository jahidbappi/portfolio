'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeUp, transition } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} transition={transition}>
      {children}
    </motion.div>
  );
}
