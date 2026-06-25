import { Reveal } from './Reveal';

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ label, title, description, align = 'left', className = '' }: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <Reveal className={`max-w-3xl ${alignClass} ${className}`}>
      <p className="eyebrow">{label}</p>
      <h2 className={`display-lg mt-5 ${align === 'center' ? 'mx-auto' : ''}`}>{title}</h2>
      {description && <p className={`body-lg mt-6 ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{description}</p>}
    </Reveal>
  );
}

export function Divider() {
  return <div className="h-px w-full bg-[#1a1a1a]" aria-hidden />;
}
