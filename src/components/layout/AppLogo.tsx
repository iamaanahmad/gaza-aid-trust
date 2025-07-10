import { cn } from '@/lib/utils';
import React from 'react';

export function AppLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M12 2c-4.42 0-8 3.58-8 8 0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0"
      />
      <path
        d="M12 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"
        fill="none"
      />
      <path
        d="M12 10.31c.62-.62 1.64-1.81 1.64-1.81.33-.33.86-.33 1.19 0 .33.33.33.86 0 1.19l-1.07 1.07c-.33.33-.86.33-1.19 0l-.57-.57-.57.57c-.33.33-.86.33-1.19 0l-1.07-1.07c-.33-.33-.33-.86 0-1.19s.86-.33 1.19 0l1.64 1.81z"
        transform="translate(0, -1)"
        fill="hsl(var(--card))"
        className="group-hover:fill-primary-foreground/20"
      />
    </svg>
  );
}
