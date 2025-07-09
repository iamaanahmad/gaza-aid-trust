'use client';

import { useState } from 'react';
import { mockAidRequests } from '@/lib/mock-data';
import type { AidRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { HandHeart, Users, MapPin, MessageSquareQuote } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';

function DonateDialog({ request }: { request: AidRequest }) {
  const [pledged, setPledged] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pledge a Donation</DialogTitle>
        <DialogDescription>
          You are about to fulfill the request for "{request.description}".
        </DialogDescription>
      </DialogHeader>
      {pledged ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-green-600 font-headline">Thank You!</h3>
          <p className="text-muted-foreground mt-2">Your pledge has been recorded. This will bring much needed relief.</p>
        </div>
      ) : (
        <div className="py-4">
          <p className="mb-4">
            A local partner will use your donation to purchase and deliver the requested items to the family in {request.locationName}.
          </p>
          <p className="font-bold text-lg mb-4">Simulated Donation: $50</p>
          <Button onClick={() => setPledged(true)} className="w-full" size="lg">
            Confirm Pledge
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">This is a mock donation flow for the hackathon prototype.</p>
        </div>
      )}
    </DialogContent>
  );
}

function AidRequestCard({ request }: { request: AidRequest }) {
  const getStatusVariant = (status: AidRequest['status']) => {
    switch (status) {
      case 'Needed':
        return 'destructive';
      case 'Pledged':
        return 'default';
      case 'Fulfilled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      {request.photoUrl && (
        <div className="relative h-48 w-full">
            <Image
              src={request.photoUrl}
              alt={request.description}
              fill
              className="object-cover"
              data-ai-hint="aid food package"
            />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-headline">{request.category} Request</CardTitle>
            <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
        </div>
        <CardDescription className="pt-2">{request.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>Family of {request.familySize}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{request.locationName}</span>
        </div>
      </CardContent>
       {request.status === 'Fulfilled' && request.feedback && (
        <div className="px-6 pb-4 pt-0 text-sm">
           <div className="flex items-center gap-2 font-semibold text-muted-foreground mb-2">
            <MessageSquareQuote className="h-4 w-4" />
            <span>Feedback from Recipient</span>
           </div>
          <blockquote className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground">
            {request.feedback}
          </blockquote>
        </div>
      )}
      <Separator />
      <CardFooter className="pt-4 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
        </p>
        {request.status === 'Needed' && (
           <Dialog>
             <DialogTrigger asChild>
                <Button>
                  <HandHeart className="mr-2 h-4 w-4" />
                  Donate
                </Button>
             </DialogTrigger>
             <DonateDialog request={request} />
           </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}

export function AidFeed() {
  const [requests] = useState<AidRequest[]>(mockAidRequests);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request) => (
        <AidRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
