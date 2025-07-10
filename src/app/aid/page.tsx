
'use client';

import { AidFeed } from '@/components/aid/AidFeed';
import { RequestAidForm } from '@/components/aid/RequestAidForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/use-translation';
import { HandHeart } from 'lucide-react';
import { useState } from 'react';

export default function AidPage() {
  const { t } = useTranslation();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{t('aid_title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {t('aid_subtitle')}
          </p>
        </div>
        <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <HandHeart className="rtl:ml-2 ltr:mr-2 h-5 w-5" />
              {t('request_aid_button')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('request_aid_form_title')}</DialogTitle>
              <DialogDescription>
                {t('request_aid_form_description')}
              </DialogDescription>
            </DialogHeader>
            <RequestAidForm onFormSubmit={() => setIsRequestFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <AidFeed />
    </div>
  );
}
