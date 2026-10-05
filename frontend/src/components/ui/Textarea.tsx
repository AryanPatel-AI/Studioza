import React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full border border-[var(--border-medium)] bg-transparent px-4 py-3 type-body-base text-[var(--ink-primary)] transition-colors placeholder:text-[var(--ink-muted)] focus-visible:outline-none focus-visible:border-[var(--accent-muted-gold)] disabled:cursor-not-allowed disabled:opacity-50 rounded-none resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
