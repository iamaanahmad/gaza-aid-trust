
'use client';

import { useState, useEffect, useCallback } from 'react';
import { alertsCollection } from '@/lib/firebase';
import type { Alert } from '@/lib/types';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, RadioTower, Clock, X, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { calculateTrustScore } from '@/ai/flows/calculate-trust-score';
import Map, { Marker, Popup } from 'react-map-gl';
import { Skeleton } from '../ui/skeleton';
import { mockAlerts } from '@/lib/mock-data';
import { useTranslation } from '@/hooks/use-translation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ALERTS_CACHE_KEY = 'gaza-aid-trust-alerts';

function getPinColor(alert: Alert) {
  if (alert.type === 'triage') {
    switch (alert.priority) {
      case 'High': return '#ef4444'; // red-500
      case 'Medium': return '#f59e0b'; // amber-500
      case 'Low': return '#22c55e'; // green-500
      default: return '#71717a'; // zinc-500
    }
  }
  // Fallback for general alerts based on trust score
  if (alert.trustScore > 75) return '#22c55e'; // green-500
  if (alert.trustScore > 50) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
}


function SelectedAlertPopup({ alert, onUpdate, onClose }: { alert: Alert | null; onUpdate: (updatedAlert: Alert) => void; onClose: () => void }) {
  const { toast } = useToast();
  const { t } = useTranslation();

  if (!alert) return null;
  
  const handleTrustUpdate = async (isConfirm: boolean) => {
    toast({ title: t('toast_thank_you'), description: t('toast_feedback_recorded') });
    const updatedAlert = {
      ...alert,
      confirmations: alert.confirmations + (isConfirm ? 1 : 0),
      disputes: alert.disputes + (isConfirm ? 0 : 1),
    };
    
    // Optimistic UI update
    onUpdate(updatedAlert);

    try {
      const { trustScore } = await calculateTrustScore({
        confirmations: updatedAlert.confirmations,
        disputes: updatedAlert.disputes,
        initialScore: 50, // Base score for a new alert
      });

      const finalAlert = {...updatedAlert, trustScore};
      // Final update with AI score
      onUpdate(finalAlert);

      // Update Firestore document
      const alertDoc = doc(alertsCollection, alert.id);
      await updateDoc(alertDoc, { 
          confirmations: finalAlert.confirmations,
          disputes: finalAlert.disputes,
          trustScore: finalAlert.trustScore
       });

      toast({ title: t('toast_trust_score_updated'), description: t('toast_trust_score_updated_desc', { score: trustScore }) });

    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: t('toast_ai_error'),
            description: t('toast_trust_score_update_error'),
        })
    }
  };

  return (
    <Popup
        longitude={alert.location.lng}
        latitude={alert.location.lat}
        onClose={onClose}
        closeButton={false}
        closeOnClick={false}
        offset={35}
        anchor="bottom"
        className="font-body z-40"
    >
        <div className="w-80 rounded-lg shadow-lg bg-background text-foreground overflow-hidden">
            <div className="p-4 flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg pt-1">{alert.locationName}</h3>
                <button 
                    onClick={onClose} 
                    className="p-1 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50 transition-colors flex-shrink-0"
                    aria-label={t('close_button')}
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            
            <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                    <RadioTower className="h-4 w-4 rtl:ml-2 ltr:mr-2 flex-shrink-0" />
                    <span>{t('reported_by_anonymous')}</span>
                </div>
                
                <p className="text-sm">{alert.description}</p>
                
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                          <span>{t('trust_score_label')}: {alert.trustScore}%</span>
                          <Info className="h-3 w-3" />
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('trust_score_tooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Progress value={alert.trustScore} className="mt-1 h-2" />
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 rtl:ml-2 ltr:mr-2 flex-shrink-0" />
                    <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                </div>
            </div>

            <div className="px-4 py-3 border-t bg-muted/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-2">{t('is_info_accurate')}</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(true)} className="bg-background hover:bg-green-50 hover:border-green-300">
                        <ThumbsUp className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-green-600" />
                        {t('confirm_button')} ({alert.confirmations})
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(false)} className="bg-background hover:bg-red-50 hover:border-red-300">
                        <ThumbsDown className="rtl:ml-2 ltr:mr-2 h-4 w-4 text-red-600" />
                        {t('dispute_button')} ({alert.disputes})
                    </Button>
                </div>
            </div>
        </div>
    </Popup>
  );
}

const MapSkeleton = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
            <RadioTower className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
            <p className="mt-4 text-muted-foreground">{t('map_loading')}</p>
        </div>
    </div>
  )
};

export function CrisisMap() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    let isSubscribed = true;

    const loadAndCacheAlerts = (alertsData: Alert[]) => {
      if (!isSubscribed) return;
      setAlerts(alertsData);
      try {
        localStorage.setItem(ALERTS_CACHE_KEY, JSON.stringify(alertsData));
      } catch (e) {
        console.error("Failed to write to localStorage", e);
      }
    };
    
    const handleFirestoreError = (error: Error) => {
      console.error("Error fetching alerts:", error);
      toast({
          variant: "destructive",
          title: t('toast_error_title'),
          description: t('toast_fetch_alerts_error')
      });
      if (isSubscribed) {
        const mockData = mockAlerts.map((alert, index) => ({...alert, id: `mock-${index}`}))
        loadAndCacheAlerts(mockData);
        setLoading(false);
      }
    };
    
    // Load from cache first
    try {
      const cachedAlerts = localStorage.getItem(ALERTS_CACHE_KEY);
      if (cachedAlerts) {
        const parsedAlerts = JSON.parse(cachedAlerts);
        if(parsedAlerts.length > 0) {
          setAlerts(parsedAlerts);
          setLoading(false);
        }
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }
    
    // Subscribe to Firestore
    const unsubscribe = onSnapshot(alertsCollection, 
      (snapshot) => {
        if (!isSubscribed) return;

        let alertsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Alert));
        if (alertsData.length === 0) {
            console.log("Firestore is empty, falling back to mock alerts.");
            alertsData = mockAlerts.map((alert, index) => ({...alert, id: `mock-${index}`}));
        }
        
        loadAndCacheAlerts(alertsData);
        setLoading(false);
      }, 
      (error) => {
        if (isSubscribed) {
          handleFirestoreError(error);
        }
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, [t, toast]);

  const handleUpdateAlert = (updatedAlert: Alert) => {
    setAlerts(prev => prev.map(a => a.id === updatedAlert.id ? updatedAlert : a));
    setSelectedAlert(updatedAlert);
  };
  
  const initialViewState = {
      longitude: 34.4,
      latitude: 31.4,
      zoom: 10
  }

  if (loading) {
      return <MapSkeleton />;
  }

  return (
    <div className="w-full h-full relative" role="application" aria-label={t('crisis_map_label')}>
        <style jsx global>{`
          .mapboxgl-popup-content {
            padding: 0;
            background: transparent;
            box-shadow: none;
          }
        `}</style>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={initialViewState}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={() => setSelectedAlert(null)}
        >
            {alerts.map((alert) => (
                <Marker key={alert.id} longitude={alert.location.lng} latitude={alert.location.lat} onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedAlert(alert);
                }}>
                    <div className="cursor-pointer relative" aria-label={t('alert_label', { location: alert.locationName })}>
                        <svg viewBox="0 0 24 24" className="h-8 w-8 drop-shadow-lg" style={{stroke: 'white', strokeWidth: 1.5, fill: getPinColor(alert)}}>
                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs -translate-y-1">
                          {(alert.priority || '').charAt(0)}
                        </span>
                    </div>
                </Marker>
            ))}

            <SelectedAlertPopup alert={selectedAlert} onUpdate={handleUpdateAlert} onClose={() => setSelectedAlert(null)} />
        </Map>
    </div>
  );
}
