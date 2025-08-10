'use client';

import { useState, useEffect } from 'react';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(prev => {
        if (prev) {
          // Trigger data sync when coming back online
          window.dispatchEvent(new CustomEvent('app:back-online'));
          return false;
        }
        return prev;
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Empty dependency array to prevent infinite re-renders

  return { isOnline, wasOffline };
}