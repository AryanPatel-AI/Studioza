import React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full border-b border-[var(--border-medium)] bg-transparent px-0 py-3 type-body-base text-[var(--ink-primary)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--ink-muted)] focus-visible:outline-none focus-visible:border-[var(--accent-muted-gold)] disabled:cursor-not-allowed disabled:opacity-50 rounded-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
