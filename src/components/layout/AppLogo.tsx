import { cn } from '@/lib/utils';
import React from 'react';

export function AppLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary', className)}
      {...props}
    >
      <path 
        d="M12.004 21.354c.73-.693 5.48-5.18 5.48-9.852 0-2.828-2.3-5.128-5.16-5.128-1.74 0-3.32.84-4.28 2.144-.13.17-.25.35-.35.54M8.5 3.5c-1.79 1.94-2.5 4.58-2.5 7.5 0 4.672 4.75 9.16 5.48 9.852"
        fill="hsl(var(--primary))"
        stroke="none"
      />
      <path 
        d="M8.5 3.5c-1.99 2.16-2.79 5.06-2.67 8.1.13 3.42 1.95 6.55 4.67 8.75" 
        stroke="hsl(var(--primary-foreground))"
        opacity="0.3"
      />
      <path
        d="M14.5,5.5 A4,4 0 0,0 10.5,9.5 M10.5,9.5 A4,4 0 0,1 6.5,13.5"
        strokeWidth="1.2"
        fill="none"
        stroke="hsl(var(--primary-foreground))"
      />
      <circle cx="15" cy="5" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
      <circle cx="13" cy="7" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
      <circle cx="11" cy="9" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
      <circle cx="9" cy="11" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
      <circle cx="7" cy="13" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
    </svg>
  );
}
