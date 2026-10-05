import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex w-full appearance-none border-b border-[var(--border-medium)] bg-transparent px-0 py-3 pr-8 type-body-base text-[var(--ink-primary)] transition-colors focus-visible:outline-none focus-visible:border-[var(--accent-muted-gold)] disabled:cursor-not-allowed disabled:opacity-50 rounded-none cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)]">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--ink-primary)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
