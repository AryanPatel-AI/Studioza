import React from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
}

export function MagneticButton({ children, className, variant = 'primary', ...props }: MagneticButtonProps) {
  // Simple styling for now, mapping to our new global architectural buttons
  const baseStyles = "inline-flex items-center justify-center gap-2 type-meta px-6 py-3 border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer uppercase";
  
  const variants = {
    primary: "bg-[var(--bg-deep-night)] text-[var(--bg-warm-ivory)] border-[var(--bg-deep-night)] hover:bg-[var(--bg-near-black)]",
    secondary: "bg-transparent text-[var(--bg-near-black)] border-[var(--border-medium)] hover:border-[var(--accent-muted-gold)] hover:text-[var(--accent-dark-bronze)]",
    dark: "bg-[rgba(247,245,240,0.05)] text-[var(--ink-inverse)] border-[var(--border-dark)] hover:bg-[rgba(247,245,240,0.1)]",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
