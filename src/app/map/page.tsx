
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
import { useState } from 'react';

export default function MapPage() {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleNewAlert = (newAlert: Alert) => {
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] h-[calc(100dvh-3.5rem)] overflow-hidden">
      {/* Map container with responsive height */}
      <div className="relative flex-1 min-h-0 w-full">
        <ErrorBoundary>
          <CrisisMap alerts={alerts} setAlerts={setAlerts} />
        </ErrorBoundary>

        {/* Floating action button with better positioning */}
        <div className="absolute bottom-6 ltr:right-6 rtl:left-6 z-50 md:bottom-8 md:ltr:right-8 md:rtl:left-8">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="rounded-full h-14 w-14 shadow-xl md:h-16 md:w-16 hover:scale-105 transition-all duration-200 bg-primary hover:bg-primary/90 border-2 border-white/20 backdrop-blur-sm"
                aria-label={t('post_alert_button')}
              >
                <Megaphone className="h-6 w-6 md:h-8 md:w-8" />
                <span className="sr-only">{t('post_alert_button')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="bottom" 
              className="max-h-[90vh] overflow-y-auto border-t-2 rounded-t-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
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
      </div>
    </div>
  );
}
