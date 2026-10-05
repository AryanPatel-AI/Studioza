import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'dark';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-[var(--bg-near-black)] text-[var(--bg-warm-ivory)]",
    outline: "border border-[var(--border-medium)] text-[var(--ink-primary)]",
    dark: "bg-[var(--bg-warm-ivory)] text-[var(--bg-deep-night)]",
  };

  return (
    <div className={cn("inline-flex items-center type-meta px-3 py-1 uppercase rounded-none", variants[variant], className)} {...props} />
  );
}
