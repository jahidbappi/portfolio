export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const transition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
