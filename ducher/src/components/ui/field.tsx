import * as React from 'react';

import { cn } from '@/lib/utils';

const baseField =
  'w-full rounded-2xl border border-input bg-card/60 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/25';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => (
  <input type={type} ref={ref} className={cn(baseField, className)} {...props} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(baseField, 'min-h-32 resize-y', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(baseField, 'cursor-pointer appearance-none', className)} {...props}>
    {children}
  </select>
));
Select.displayName = 'Select';

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground', className)}
      {...props}
    >
      {children}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-xs font-medium text-destructive">
      {children}
    </p>
  );
}
