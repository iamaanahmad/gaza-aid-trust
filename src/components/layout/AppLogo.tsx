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
        d="M12 21.35C7.94 16.25 4 12.36 4 9.5C4 5.36 7.5 2 12 2C16.5 2 20 5.36 20 9.5C20 12.36 16.06 16.25 12 21.35Z" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M12 12.5C11.19 11.66 10.05 11 9 11C7.34 11 6 12.34 6 14C6 15.34 6.88 16.73 8.36 17.65L12 15.5L15.64 17.65C17.12 16.73 18 15.34 18 14C18 12.34 16.66 11 15 11C13.95 11 12.81 11.66 12 12.5Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
