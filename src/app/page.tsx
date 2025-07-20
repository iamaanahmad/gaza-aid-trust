
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, HandHeart, Calculator, Trophy } from 'lucide-react';
import Image from 'next/image';
import { TutorialDialog } from '@/components/home/TutorialDialog';
import { PrayerTimes } from '@/components/home/PrayerTimes';
import { Separator } from '@/components/ui/separator';
import communityImage from '@/app/community.png';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: t('feature_map_title'),
      description: t('feature_map_description'),
      link: '/map',
      cta: t('feature_map_cta'),
    },
    {
      icon: <HandHeart className="h-10 w-10 text-primary" />,
      title: t('feature_aid_title'),
      description: t('feature_aid_description'),
      link: '/aid',
      cta: t('feature_aid_cta'),
    },
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: t('feature_zakat_title'),
      description: t('feature_zakat_description'),
      link: '/zakat',
      cta: t('feature_zakat_cta'),
    },
    {
        icon: <Trophy className="h-10 w-10 text-primary" />,
        title: t('feature_leaderboard_title'),
        description: t('feature_leaderboard_description'),
        link: '/leaderboard',
        cta: t('feature_leaderboard_cta'),
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src={communityImage}
          alt="A supportive community in Gaza"
          fill
          priority
          className="object-cover -z-10"
          data-ai-hint="community support"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none uppercase">
            {t('hero_title')}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <Button asChild size="lg">
              <Link href="/aid">{t('donate_now_button')}</Link>
            </Button>
            <TutorialDialog />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="mt-4 font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.link}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <PrayerTimes />
          </div>
      </section>
    </div>
  );
}
