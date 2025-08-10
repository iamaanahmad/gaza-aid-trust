'use client';

import { useOffline } from '@/hooks/use-offline';
import { useTranslation } from '@/hooks/use-translation';
import { WifiOff, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export function OfflineIndicator() {
  const { isOnline, wasOffline } = useOffline();
  const { t } = useTranslation();
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowBackOnline(true);
      const timer = setTimeout(() => setShowBackOnline(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showBackOnline) return null;

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>{t('back_online', { default: 'Back online - syncing data...' })}</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>{t('offline_mode', { default: 'Offline mode - using cached data' })}</span>
          </>
        )}
      </div>
    </div>
  );
}