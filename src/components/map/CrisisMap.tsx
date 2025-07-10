'use client';

import { useState } from 'react';
import { mockAlerts } from '@/lib/mock-data';
import type { Alert } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, RadioTower, Clock, X, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { calculateTrustScore } from '@/ai/flows/calculate-trust-score';
import Map, { Marker, Popup } from 'react-map-gl';

function getPinColor(score: number) {
  if (score > 75) return '#22c55e'; // green-500
  if (score > 50) return '#f59e0b'; // yellow-500
  return '#ef4444'; // red-500
}


function SelectedAlertCard({ alert, onUpdate, onClose }: { alert: Alert | null; onUpdate: (updatedAlert: Alert) => void; onClose: () => void }) {
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
        closeButton={false}
        offset={25}
        anchor="bottom"
    >
        <Card className="w-full max-w-sm shadow-2xl z-20">
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle className="font-headline">{alert.locationName}</CardTitle>
                        <CardDescription className="flex items-center pt-1">
                            <RadioTower className="h-3 w-3 mr-1.5" />
                            Reported by Anonymous
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close alert</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{alert.description}</p>
                <div>
                <label className="text-sm font-medium">Trust Score: {alert.trustScore}%</label>
                <Progress value={alert.trustScore} className="mt-1 h-2" />
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-4">
                    <Clock className="h-3 w-3 mr-1.5" />
                    <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Is this accurate?</p>
                <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(true)}>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Confirm ({alert.confirmations})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTrustUpdate(false)}>
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dispute ({alert.disputes})
                </Button>
                </div>
            </CardFooter>
        </Card>
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

            <SelectedAlertCard alert={selectedAlert} onUpdate={handleUpdateAlert} onClose={() => setSelectedAlert(null)} />
        </Map>
    </div>
  );
}
