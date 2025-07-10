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
        d="M12 21.35L11.08 20.46C7.5 17.15 5 14.88 5 12C5 9.79 6.79 8 9 8C10.34 8 11.62 8.67 12 9.71C12.38 8.67 13.66 8 15 8C17.21 8 19 9.79 19 12C19 14.88 16.5 17.15 12.92 20.46L12 21.35Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="hsl(var(--primary))"
        fillOpacity="0.2"
      />
    </svg>
  );
}
