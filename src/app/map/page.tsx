
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
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)]">
      {/* Map container with responsive height */}
      <div className="relative flex-1 min-h-0">
        <ErrorBoundary>
          <CrisisMap alerts={alerts} setAlerts={setAlerts} />
        </ErrorBoundary>

        {/* Floating action button with better mobile positioning */}
        <div className="absolute bottom-4 ltr:left-4 rtl:right-4 z-30 md:bottom-6 md:ltr:left-6 md:rtl:right-6">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="rounded-full h-14 w-14 shadow-lg md:h-16 md:w-16 hover:scale-105 transition-transform"
              >
                <Megaphone className="h-6 w-6 md:h-8 md:w-8" />
                <span className="sr-only">{t('post_alert_button')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('submit_alert_form_title')}</SheetTitle>
                <SheetDescription>
                  {t('submit_alert_form_description')}
                </SheetDescription>
              </SheetHeader>
              <SubmitAlertForm onFormSubmit={handleNewAlert} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
