'use client';

import { ZakatCalculator } from '@/components/zakat/ZakatCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export default function ZakatPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">{t('zakat_title')}</CardTitle>
          <CardDescription className="text-lg">
            {t('zakat_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-center">
            {t('zakat_description')}
          </p>
          <ZakatCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
