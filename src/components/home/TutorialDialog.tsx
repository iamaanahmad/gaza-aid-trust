'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Map, HandHeart, Calculator, Trophy } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function TutorialDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-background/20 text-white border-white hover:bg-background/30 hover:text-white">
            <HelpCircle className="rtl:ml-2 ltr:mr-2 h-5 w-5" />
            {t('how_it_works_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold">{t('tutorial_title')}</DialogTitle>
          <DialogDescription>
            {t('tutorial_subtitle')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
            <div className="flex items-start gap-4">
                <Map className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">{t('tutorial_map_title')}</h4>
                    <p className="text-muted-foreground">{t('tutorial_map_desc')}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <HandHeart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">{t('tutorial_aid_title')}</h4>
                    <p className="text-muted-foreground">{t('tutorial_aid_desc')}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Calculator className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">{t('tutorial_zakat_title')}</h4>
                    <p className="text-muted-foreground">{t('tutorial_zakat_desc')}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Trophy className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">{t('tutorial_leaderboard_title')}</h4>
                    <p className="text-muted-foreground">{t('tutorial_leaderboard_desc')}</p>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
