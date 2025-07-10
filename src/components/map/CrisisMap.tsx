'use client';

import { useState, useEffect } from 'react';
import { alertsCollection } from '@/lib/firebase';
import type { Alert } from '@/lib/types';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, RadioTower, Clock, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { calculateTrustScore } from '@/ai/flows/calculate-trust-score';
import Map, { Marker, Popup } from 'react-map-gl';
import { Skeleton } from '../ui/skeleton';
import { mockAlerts } from '@/lib/mock-data';

function getPinColor(score: number) {
  if (score > 75) return '#22c55e'; // green-500
  if (score > 50) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
}


function SelectedAlertPopup({ alert, onUpdate, onClose }: { alert: Alert | null; onUpdate: (updatedAlert: Alert) => void; onClose: () => void }) {
  const { toast } = useToast();

  if (!alert) return null;
  
  const handleTrustUpdate = async (isConfirm: boolean) => {
    toast({ title: 'شكرًا لك!', description: 'يتم تسجيل ملاحظاتك.' });
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

      toast({ title: 'تم تحديث درجة الثقة', description: `الدرجة الآن ${trustScore}%.` });

    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "خطأ في الذكاء الاصطناعي",
            description: "لم نتمكن من تحديث درجة الثقة.",
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
                    aria-label="أغلق"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            
            <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                    <RadioTower className="h-4 w-4 ml-2 flex-shrink-0" />
                    <span>تم الإبلاغ بواسطة مجهول</span>
                </div>
                
                <p className="text-sm">{alert.description}</p>
                
                <div>
                  <label className="text-xs font-medium text-muted-foreground">درجة الثقة: {alert.trustScore}%</label>
                  <Progress value={alert.trustScore} className="mt-1 h-2" />
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 ml-2 flex-shrink-0" />
                    <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                </div>
            </div>

            <div className="px-4 py-3 border-t bg-muted/50 text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-2">هل هذه المعلومة دقيقة؟</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(true)} className="bg-background hover:bg-green-50 hover:border-green-300">
                        <ThumbsUp className="ml-2 h-4 w-4 text-green-600" />
                        تأكيد ({alert.confirmations})
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(false)} className="bg-background hover:bg-red-50 hover:border-red-300">
                        <ThumbsDown className="ml-2 h-4 w-4 text-red-600" />
                        نفي ({alert.disputes})
                    </Button>
                </div>
            </div>
        </div>
    </Popup>
  );
}

const MapSkeleton = () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
            <RadioTower className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
            <p className="mt-4 text-muted-foreground">جاري تحميل الخريطة والتنبيهات...</p>
        </div>
    </div>
);

export function CrisisMap() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    const unsubscribe = onSnapshot(alertsCollection, 
      (snapshot) => {
        let alertsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Alert));
        // Fallback to mock data if Firestore is empty
        if (alertsData.length === 0) {
            alertsData = mockAlerts.map((alert, index) => ({...alert, id: `mock-${index}`}));
        }
        setAlerts(alertsData);
        setLoading(false);
      }, 
      (error) => {
        console.error("Error fetching alerts:", error);
        toast({
            variant: "destructive",
            title: "خطأ",
            description: "تعذر جلب التنبيهات. يتم الآن عرض بيانات وهمية."
        })
        // Fallback to mock data on error
        setAlerts(mockAlerts.map((alert, index) => ({...alert, id: `mock-${index}`})));
        setLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, [toast]);

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
    <div className="w-full h-full relative" role="application" aria-label="Crisis Map">
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
                    <div className="cursor-pointer" aria-label={`تنبيه: ${alert.locationName}`}>
                        <svg viewBox="0 0 24 24" className="h-8 w-8 drop-shadow-lg" style={{stroke: 'white', strokeWidth: 1.5, fill: getPinColor(alert.trustScore)}}>
                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                    </div>
                </Marker>
            ))}

            <SelectedAlertPopup alert={selectedAlert} onUpdate={handleUpdateAlert} onClose={() => setSelectedAlert(null)} />
        </Map>
    </div>
  );
}
