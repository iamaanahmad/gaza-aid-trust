
'use client';

import { useEffect, useState } from 'react';
import type { PrayerTimesData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sun, Sunrise, Sunset, Moon } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const PRAYER_TIMES_CACHE_KEY = 'gaza-aid-trust-prayer-times';

const MosqueIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 13h2" />
      <path d="M20 13h2" />
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M18 13a8 3 0 0 0-12 0" />
      <path d="M12 2v2" />
      <path d="M12 7v1" />
      <path d="M12 13v8" />
      <path d="M10 13h4" />
      <path d="M6 13h.01" />
      <path d="M18 13h.01" />
      <path d="M8 21h8" />
      <path d="M12 3a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2Z" />
    </svg>
  );

const prayerIcons = {
  Fajr: <Sunrise className="h-6 w-6 text-primary" />,
  Dhuhr: <Sun className="h-6 w-6 text-primary" />,
  Asr: <Sun className="h-6 w-6 text-primary" />,
  Maghrib: <Sunset className="h-6 w-6 text-primary" />,
  Isha: <Moon className="h-6 w-6 text-primary" />,
};

const PrayerTimeSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="text-center">
                <CardHeader className="items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-6 w-20 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-24 mx-auto" />
                </CardContent>
            </Card>
        ))}
    </div>
);

export function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const prayerNameTranslations = {
    Fajr: t('prayer_fajr'),
    Dhuhr: t('prayer_dhuhr'),
    Asr: t('prayer_asr'),
    Maghrib: t('prayer_maghrib'),
    Isha: t('prayer_isha'),
  }

  useEffect(() => {
    const fetchPrayerTimes = async () => {
        setLoading(true);
        try {
            const cachedData = localStorage.getItem(PRAYER_TIMES_CACHE_KEY);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                if (parsedData && parsedData.timings) {
                    setPrayerTimes(parsedData);
                }
            }
        } catch (e) {
            console.error("Failed to read prayer times from localStorage", e);
        }

        try {
            const response = await fetch(
                'https://api.aladhan.com/v1/timingsByCity?city=Gaza&country=Palestine&method=4'
            );
            if (!response.ok) {
                throw new Error(t('prayer_times_fetch_error_service'));
            }
            const data = await response.json();
            if (data.code === 200) {
                const relevantTimes = {
                    Fajr: data.data.timings.Fajr,
                    Dhuhr: data.data.timings.Dhuhr,
                    Asr: data.data.timings.Asr,
                    Maghrib: data.data.timings.Maghrib,
                    Isha: data.data.timings.Isha,
                };
                const result = {
                    timings: relevantTimes,
                    date: data.data.date.readable,
                };
                setPrayerTimes(result);
                try {
                    localStorage.setItem(PRAYER_TIMES_CACHE_KEY, JSON.stringify(result));
                } catch (e) {
                    console.error("Failed to write prayer times to localStorage", e);
                }
            } else {
                throw new Error(data.data || t('prayer_times_fetch_error_generic'));
            }
        } catch (err: any) {
            console.error(err);
            if (!prayerTimes) { 
              setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchPrayerTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !prayerTimes) {
    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">{t('prayer_times_title')}</h2>
                <p className="text-muted-foreground">{t('prayer_times_loading')}</p>
            </div>
            <PrayerTimeSkeleton />
        </div>
    );
  }

  if (error && !prayerTimes) {
    return (
        <Alert variant="destructive">
            <AlertTitle>{t('prayer_times_fetch_error_title')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  if (!prayerTimes) {
    return null;
  }

  return (
    <div>
        <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <MosqueIcon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{t('prayer_times_daily_title')}</h2>
            <p className="text-muted-foreground">
                {t('prayer_times_location_date', { date: prayerTimes?.date })}
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prayerTimes && Object.entries(prayerTimes.timings).map(([name, time]) => (
                <Card key={name} className="text-center flex flex-col justify-center">
                    <CardHeader className="items-center pb-2">
                        {(prayerIcons as any)[name]}
                        <CardTitle className="text-lg font-bold mt-2">{(prayerNameTranslations as any)[name]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{time}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
