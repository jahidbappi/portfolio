'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const current = theme ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
  };

  const resolved = theme ?? 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={resolved === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      {theme === null ? (
        <span className="h-4 w-4" aria-hidden />
      ) : resolved === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
