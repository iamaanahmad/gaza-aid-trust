
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AidRequest } from '@/lib/types';
import { aidRequestsCollection } from '@/lib/firebase';
import { doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { HandHeart, Users, MapPin, MessageSquareQuote, CircleCheck, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { mockAidRequests } from '@/lib/mock-data';
import { useTranslation } from '@/hooks/use-translation';

function DonateDialog({ request, onPledgeSuccess }: { request: AidRequest, onPledgeSuccess: () => void }) {
  const [pledgeState, setPledgeState] = useState<'idle' | 'processing' | 'success'>('idle');
  const { toast } = useToast();
  const { t } = useTranslation();

  const handlePledge = async () => {
    setPledgeState('processing');
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const requestDoc = doc(aidRequestsCollection, request.id);
      await updateDoc(requestDoc, { status: 'Pledged' });
      
      setPledgeState('success');
      
      toast({
        title: t('toast_thank_you'),
        description: t('toast_pledge_success'),
      });

      // Wait for 2 seconds on the success screen, then close
      setTimeout(() => {
        onPledgeSuccess();
      }, 2000);

    } catch (error) {
      console.error('Error pledging donation: ', error);
      setPledgeState('idle'); // Reset state on error
      toast({
        variant: 'destructive',
        title: t('toast_error_title'),
        description: t('toast_pledge_error'),
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('donate_dialog_title')}</DialogTitle>
        <DialogDescription>
          {t('donate_dialog_description', { description: request.description })}
        </DialogDescription>
      </DialogHeader>

      {pledgeState === 'success' ? (
        <div className="text-center py-8 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
            <CircleCheck className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-green-600">{t('toast_thank_you')}</h3>
            <p className="text-muted-foreground mt-2">{t('toast_pledge_success')}</p>
        </div>
      ) : (
        <div className="py-4">
          <p className="mb-4">
            {t('donate_dialog_body', { location: request.locationName })}
          </p>
          <p className="font-bold text-lg mb-4">{t('donate_dialog_mock_amount')}</p>
          <Button onClick={handlePledge} className="w-full" size="lg" disabled={pledgeState === 'processing'}>
            {pledgeState === 'processing' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('submitting_button')}
              </>
            ) : (
              t('confirm_pledge_button')
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">{t('donate_dialog_mock_notice')}</p>
        </div>
      )}
    </DialogContent>
  );
}

function AidRequestCard({ request }: { request: AidRequest }) {
  const { t } = useTranslation();
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const getStatusVariant = (status: AidRequest['status']) => {
    switch (status) {
      case 'Needed':
        return request.priority === 'High' ? 'destructive' : 'default';
      case 'Pledged':
        return 'default';
      case 'Fulfilled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  const statusTranslations: { [key in AidRequest['status']]: string } = {
    Needed: t('status_needed'),
    Pledged: t('status_pledged'),
    Fulfilled: t('status_fulfilled'),
  };

  const categoryTranslations: { [key in AidRequest['category']]: string } = {
    Food: t('category_food'),
    Medicine: t('category_medicine'),
    Shelter: t('category_shelter'),
  }

  const priorityTranslations: { [key in AidRequest['priority']]: string } = {
    High: t('priority_high'),
    Medium: t('priority_medium'),
    Low: t('priority_low'),
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      {request.photoUrl && (
        <div className="relative h-48 w-full">
            <Image
              src={request.photoUrl}
              alt={request.description}
              fill
              className="object-cover"
              data-ai-hint="aid medical package"
            />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{t('aid_request_card_title', { category: categoryTranslations[request.category] })}</CardTitle>
            <Badge variant={getStatusVariant(request.status)}>{statusTranslations[request.status]}</Badge>
        </div>
        <CardDescription className="pt-2">{request.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm">
            <span className="font-semibold text-foreground ltr:mr-2 rtl:ml-2">{t('priority_label')}:</span>
            <Badge variant={request.priority === 'High' ? 'destructive' : 'secondary'}>
              {priorityTranslations[request.priority]}
            </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
            <span>{t('family_size', { count: request.familySize })}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
            <span>{request.locationName}</span>
        </div>
      </CardContent>
       {request.status === 'Fulfilled' && request.feedback && (
        <div className="px-6 pb-4 pt-0 text-sm">
           <div className="flex items-center gap-2 font-semibold text-muted-foreground mb-2">
            <MessageSquareQuote className="h-4 w-4" />
            <span>{t('thank_you_message')}</span>
           </div>
          <blockquote className="ltr:border-l-2 rtl:border-r-2 border-primary/50 ltr:pl-3 rtl:pr-3 italic text-muted-foreground">
            {request.feedback}
          </blockquote>
        </div>
      )}
      <Separator />
      <CardFooter className="pt-4 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {request.timestamp ? formatDistanceToNow(new Date(request.timestamp), { addSuffix: true }) : ''}
        </p>
        {request.status === 'Needed' && (
           <Dialog open={isDonateOpen} onOpenChange={setIsDonateOpen}>
             <DialogTrigger asChild>
                <Button>
                  <HandHeart className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
                  {t('donate_button')}
                </Button>
             </DialogTrigger>
             <DonateDialog request={request} onPledgeSuccess={() => setIsDonateOpen(false)} />
           </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}

const AidFeedSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col h-full">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                     <Skeleton className="h-4 w-full pt-2" />
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-24" />
                </CardFooter>
            </Card>
        ))}
    </div>
);


export function AidFeed() {
  const [requests, setRequests] = useState<AidRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleFirestoreError = useCallback((error: Error) => {
    console.error("Error fetching aid requests:", error);
    toast({
      variant: "destructive",
      title: t('toast_error_title'),
      description: t('toast_fetch_aid_error')
    });
    setRequests(mockAidRequests.map((req, index) => ({ ...req, id: `mock-${index}` })));
    setLoading(false);
  }, [t, toast]);

  useEffect(() => {
    const q = query(aidRequestsCollection, orderBy('priority', 'asc'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        let aidData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AidRequest));
        if (aidData.length === 0) {
          console.log("Firestore is empty, falling back to mock aid requests.");
          aidData = mockAidRequests.map((req, index) => ({ ...req, id: `mock-${index}` }));
        }
        
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        const statusOrder = { Needed: 0, Pledged: 1, Fulfilled: 2 };
        aidData.sort((a, b) => {
          if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
          }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        });

        setRequests(aidData);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error);
      }
    );
    return () => unsubscribe();
  }, [handleFirestoreError]);

  if (loading) {
    return <AidFeedSkeleton />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request) => (
        <AidRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
