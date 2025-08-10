
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
    <div className="flex flex-col w-full min-h-0" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Map container - takes most of the space */}
      <div className="relative flex-1 min-h-0 w-full">
        <ErrorBoundary>
          <CrisisMap alerts={alerts} setAlerts={setAlerts} />
        </ErrorBoundary>
      </div>
      
      {/* Fixed bottom bar for mobile with the button */}
      <div className="flex-shrink-0 p-4 bg-background/80 backdrop-blur-sm border-t md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="w-full h-12 rounded-lg shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              aria-label={t('post_alert_button')}
            >
              <Megaphone className="h-5 w-5 mr-2" />
              {t('post_alert_button')}
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

      {/* Floating action button for desktop */}
      <div className="absolute bottom-6 ltr:right-6 rtl:left-6 z-50 hidden md:block">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full h-16 w-16 shadow-xl hover:scale-105 transition-all duration-200 bg-primary hover:bg-primary/90 border-2 border-white/20 backdrop-blur-sm"
              aria-label={t('post_alert_button')}
            >
              <Megaphone className="h-8 w-8" />
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
  );
}
