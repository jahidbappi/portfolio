'use client';

import { useState } from 'react';
import { resumeMeta } from '@/lib/resume-content';
import { MagneticButton } from './MagneticButton';

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
};

export function DownloadResumeButton({ variant = 'secondary', size = 'lg', className = '' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/resume/ResumePdfDocument'),
      ]);

      const blob = await pdf(<ResumePdfDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = resumeMeta.fileName;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open('/resume', '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MagneticButton
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
    >
      {loading ? 'Generating…' : 'Download resume'}
    </MagneticButton>
  );
}
