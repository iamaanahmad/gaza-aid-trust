
'use client';

import { CrisisMap } from '@/components/map/CrisisMap';
import { SubmitAlertForm } from '@/components/map/SubmitAlertForm';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/use-translation';
import type { Alert } from '@/lib/types';
import { Megaphone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MapPage() {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showPulse, setShowPulse] = useState(true);

  const handleNewAlert = (newAlert: Alert) => {
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    setIsSheetOpen(false);
  };

  // Stop pulsing after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Full-screen map */}
      <ErrorBoundary>
        <CrisisMap alerts={alerts} setAlerts={setAlerts} />
      </ErrorBoundary>

      {/* Floating Post Alert Button - Google Maps style */}
      <div className="absolute bottom-6 ltr:right-4 rtl:left-4 z-50 group">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={`rounded-full h-14 w-14 md:h-16 md:w-16 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 bg-primary hover:bg-primary/90 border-2 border-white/50 backdrop-blur-sm relative ${showPulse ? 'animate-pulse' : ''} hover:animate-none`}
              aria-label={t('post_alert_button')}
            >
              <Megaphone className="h-6 w-6 md:h-8 md:w-8" />
              <span className="sr-only">{t('post_alert_button')}</span>

              {/* Tooltip on hover - desktop only */}
              <div className="absolute bottom-full mb-2 ltr:right-0 rtl:left-0 hidden md:group-hover:block">
                <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                  {t('post_alert_button')}
                  <div className="absolute top-full ltr:right-4 rtl:left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="max-h-[85vh] overflow-y-auto border-t-2 rounded-t-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
          >
            <SheetHeader className="pb-4 border-b">
              <SheetTitle className="text-xl font-bold text-center">{t('submit_alert_form_title')}</SheetTitle>
              <SheetDescription className="text-muted-foreground text-center">
                {t('submit_alert_form_description')}
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <SubmitAlertForm onFormSubmit={handleNewAlert} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Optional: Floating controls panel for additional actions */}
      <div className="absolute top-4 ltr:right-4 rtl:left-4 z-40 flex flex-col gap-2">
        {/* You can add more floating controls here if needed */}
        {/* Example: Zoom controls, layer toggles, etc. */}
      </div>
    </div>
  );
}
