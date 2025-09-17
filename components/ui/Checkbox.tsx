
import React from 'react';
import { cn } from '../../lib/utils';
import { CheckIcon } from '../Icons';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, checked, onCheckedChange, id, ...props }, ref) => {
  return (
    <>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        data-state={checked ? 'checked' : 'unchecked'}
      >
        <CheckIcon className={cn("h-4 w-4 mx-auto my-auto", checked ? "opacity-100" : "opacity-0")} />
      </button>
      {/* Hidden input for form submission and accessibility */}
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
        tabIndex={-1}
        {...props}
      />
    </>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
