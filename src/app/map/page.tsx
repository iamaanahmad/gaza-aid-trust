'use client';

import { CrisisMap } from '@/components/map/CrisisMap';
import { SubmitAlertForm } from '@/components/map/SubmitAlertForm';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/use-translation';
import { Megaphone } from 'lucide-react';

export default function MapPage() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)]">
        <CrisisMap />
        <div className="absolute bottom-6 ltr:left-6 rtl:right-6 z-30">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full h-16 w-16 shadow-lg">
                <Megaphone className="h-8 w-8" />
                <span className="sr-only">{t('post_alert_button')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t('submit_alert_form_title')}</SheetTitle>
                <SheetDescription>
                  {t('submit_alert_form_description')}
                </SheetDescription>
              </SheetHeader>
              <SubmitAlertForm />
            </SheetContent>
          </Sheet>
        </div>
    </div>
  );
}
