import { AccessibilityControls } from './AccessibilityControls';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for the "Hack for Gaza" hackathon. A prototype for hope and solidarity.
          </p>
        </div>
        <AccessibilityControls />
      </div>
    </footer>
  );
}
