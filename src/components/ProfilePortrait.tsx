'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Database } from 'lucide-react';
import Image from 'next/image';
import { site } from '@/lib/data';
import { transition } from '@/lib/utils';

const badges = [
  {
    id: 'ml',
    label: 'ML',
    icon: Brain,
    className: 'profile-badge--ml',
    iconClass: 'badge-icon-ml',
  },
  {
    id: 'stack',
    label: 'Full-Stack',
    icon: Code2,
    className: 'profile-badge--stack',
    iconClass: 'badge-icon-stack',
  },
  {
    id: 'sql',
    label: 'SQL',
    icon: Database,
    className: 'profile-badge--sql',
    iconClass: 'badge-icon-sql',
  },
];

type ProfilePortraitProps = {
  variant?: 'full' | 'simple';
};

export function ProfilePortrait({ variant = 'full' }: ProfilePortraitProps) {
  if (variant === 'simple') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.12 }}
        className="profile-portrait profile-portrait--simple mx-auto w-full max-w-[200px]"
      >
        <div className="profile-simple-glow" aria-hidden />
        <div className="profile-simple-frame">
          <div className="profile-photo-inner">
            <Image
              src={site.profileImage}
              alt={site.fullName}
              fill
              className="object-cover"
              sizes="200px"
              priority
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.15 }}
      className="profile-portrait mx-auto w-full max-w-[320px] lg:mx-0"
    >
      <div className="profile-orbit-scene">
        <div className="profile-orbit-glow" />
        <div className="profile-orbit-ring profile-orbit-ring--outer" />
        <div className="profile-orbit-ring profile-orbit-ring--mid" />
        <div className="profile-orbit-ring profile-orbit-ring--inner" />

        <span className="profile-star profile-star--1" />
        <span className="profile-star profile-star--2" />
        <span className="profile-star profile-star--3" />
        <span className="profile-star profile-star--4" />

        <div className="profile-photo-frame">
          <div className="profile-photo-inner">
            <Image
              src={site.profileImage}
              alt={site.fullName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 280px, 300px"
              priority
            />
          </div>
        </div>

        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            className={`profile-badge ${badge.className}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.28 + i * 0.08 }}
          >
            <badge.icon className={`h-3.5 w-3.5 shrink-0 ${badge.iconClass}`} />
            <span>{badge.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
