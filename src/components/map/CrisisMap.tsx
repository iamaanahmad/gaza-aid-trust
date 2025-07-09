'use client';

import { useState } from 'react';
import { mockAlerts } from '@/lib/mock-data';
import type { Alert } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, MapPin, RadioTower, Clock, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { calculateTrustScore } from '@/ai/flows/calculate-trust-score';

function AlertMarker({ alert, onSelect }: { alert: Alert; onSelect: (alert: Alert) => void }) {
  const getPinColor = (score: number) => {
    if (score > 75) return 'text-green-500';
    if (score > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ top: `${alert.location.lat}%`, left: `${alert.location.lng}%` }}
          onClick={() => onSelect(alert)}
          aria-label={`Select alert at ${alert.locationName}`}
        >
          <MapPin className={`h-8 w-8 drop-shadow-lg transition-transform hover:scale-125 ${getPinColor(alert.trustScore)}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{alert.locationName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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
    <Card className="absolute top-4 left-4 w-full max-w-sm shadow-2xl z-20 animate-in fade-in slide-in-from-left-4">
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
  );
}

export function CrisisMap() {
  const [alerts, setAlerts] = useState<Alert[]>(() => mockAlerts.map(a => ({
    ...a,
    // Remap coords to fit within a 100x100 box for display
    location: {
      lat: (a.location.lat - 31.2) * 200,
      lng: (a.location.lng - 34.2) * 200,
    }
  })));
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleUpdateAlert = (updatedAlert: Alert) => {
    setAlerts(prev => prev.map(a => a.id === updatedAlert.id ? updatedAlert : a));
    setSelectedAlert(updatedAlert);
  };

  return (
    <div className="w-full h-full bg-blue-50 relative overflow-hidden" role="application" aria-label="Crisis Map">
      {/* Fake map background */}
      <div className="absolute inset-0 bg-secondary/30 z-0">
         <div className="absolute top-1/4 left-1/4 w-32 h-20 bg-primary/10 rounded-lg transform -rotate-12"></div>
         <div className="absolute bottom-1/3 right-1/4 w-48 h-24 bg-primary/10 rounded-sm"></div>
         <div className="absolute bottom-1/2 right-1/2 w-24 h-24 bg-primary/5 rounded-full"></div>
         <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-accent/10 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full h-full">
        {alerts.map((alert) => (
          <AlertMarker key={alert.id} alert={alert} onSelect={setSelectedAlert} />
        ))}
      </div>
      
      <SelectedAlertCard alert={selectedAlert} onUpdate={handleUpdateAlert} onClose={() => setSelectedAlert(null)} />
    </div>
  );
}
