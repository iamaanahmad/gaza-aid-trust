'use client';

import { useState } from 'react';
import { mockAlerts } from '@/lib/mock-data';
import type { Alert } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, RadioTower, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { calculateTrustScore } from '@/ai/flows/calculate-trust-score';
import Map, { Marker, Popup } from 'react-map-gl';

function getPinColor(score: number) {
  if (score > 75) return '#22c55e'; // green-500
  if (score > 50) return '#f59e0b'; // yellow-500
  return '#ef4444'; // red-500
}


function SelectedAlertPopup({ alert, onUpdate, onClose }: { alert: Alert | null; onUpdate: (updatedAlert: Alert) => void; onClose: () => void }) {
  const { toast } = useToast();

  if (!alert) return null;
  
  const handleTrustUpdate = async (isConfirm: boolean) => {
    toast({ title: 'Thank you!', description: 'Your feedback is being recorded.' });
    const updatedAlert = {
      ...alert,
      confirmations: alert.confirmations + (isConfirm ? 1 : 0),
      disputes: alert.disputes + (isConfirm ? 0 : 1),
    };
    
    try {
      const { trustScore, reasoning } = await calculateTrustScore({
        confirmations: updatedAlert.confirmations,
        disputes: updatedAlert.disputes,
        initialScore: 50, // Base score for a new alert
      });

      const finalAlert = {...updatedAlert, trustScore};
      onUpdate(finalAlert);
      toast({ title: 'Trust Score Updated', description: `New score: ${trustScore}. Reason: ${reasoning}` });

    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not update trust score.",
        })
    }
  };

  return (
    <Popup
        longitude={alert.location.lng}
        latitude={alert.location.lat}
        onClose={onClose}
        closeButton={true}
        closeOnClick={false}
        offset={35}
        anchor="bottom"
        className="font-body z-40"
    >
      <div className="w-72">
        <div className="p-4 space-y-3">
            <h3 className="font-bold text-base font-headline pr-6">{alert.locationName}</h3>
            
            <div className="flex items-center text-xs text-muted-foreground">
                <RadioTower className="h-3 w-3 mr-1.5" />
                Reported by Anonymous
            </div>
            
            <p className="text-sm">{alert.description}</p>
            
            <div>
              <label className="text-xs font-medium text-muted-foreground">Trust Score: {alert.trustScore}%</label>
              <Progress value={alert.trustScore} className="mt-1 h-1.5" />
            </div>

            <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1.5" />
                <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
            </div>
        </div>

        <div className="px-4 pb-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Is this accurate?</p>
            <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(true)} className="flex-1">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Confirm ({alert.confirmations})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(false)} className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dispute ({alert.disputes})
                </Button>
            </div>
        </div>
      </div>
    </Popup>
  );
}

export function CrisisMap() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleUpdateAlert = (updatedAlert: Alert) => {
    setAlerts(prev => prev.map(a => a.id === updatedAlert.id ? updatedAlert : a));
    setSelectedAlert(updatedAlert);
  };
  
  const initialViewState = {
      longitude: 34.4,
      latitude: 31.4,
      zoom: 10
  }

  return (
    <div className="w-full h-full relative" role="application" aria-label="Crisis Map">
        <style jsx global>{`
          .mapboxgl-popup-content {
            padding: 0;
            border-radius: 0.5rem;
          }
          .mapboxgl-popup-close-button {
            right: 6px;
            top: 6px;
            font-size: 1.25rem;
            line-height: 1.25rem;
          }
        `}</style>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={initialViewState}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            {alerts.map((alert) => (
                <Marker key={alert.id} longitude={alert.location.lng} latitude={alert.location.lat} onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedAlert(alert);
                }}>
                    <div className="cursor-pointer">
                        <MapPin className={`h-8 w-8 drop-shadow-lg transition-transform hover:scale-125`} style={{color: getPinColor(alert.trustScore)}} />
                    </div>
                </Marker>
            ))}

            <SelectedAlertPopup alert={selectedAlert} onUpdate={handleUpdateAlert} onClose={() => setSelectedAlert(null)} />
        </Map>
    </div>
  );
}
