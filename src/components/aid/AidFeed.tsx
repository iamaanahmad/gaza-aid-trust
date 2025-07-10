'use client';

import { useState, useEffect } from 'react';
import type { AidRequest } from '@/lib/types';
import { aidRequestsCollection } from '@/lib/firebase';
import { getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
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
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { mockAidRequests } from '@/lib/mock-data';

function DonateDialog({ request }: { request: AidRequest }) {
  const [pledged, setPledged] = useState(false);
  const { toast } = useToast();

  const handlePledge = async () => {
    try {
      const requestDoc = doc(aidRequestsCollection, request.id);
      await updateDoc(requestDoc, { status: 'Pledged' });
      setPledged(true);
      toast({
        title: 'شكرًا لك!',
        description: 'تم تسجيل تعهدك. هذا سيجلب الإغاثة التي تشتد الحاجة إليها.',
      });
    } catch (error) {
      console.error('Error pledging donation: ', error);
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'لم نتمكن من تسجيل تعهدك. يرجى المحاولة مرة أخرى.',
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>التعهد بالتبرع</DialogTitle>
        <DialogDescription>
          أنت على وشك تلبية الطلب لـ "{request.description}".
        </DialogDescription>
      </DialogHeader>
      {pledged ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-green-600">شكرًا لك!</h3>
          <p className="text-muted-foreground mt-2">تم تسجيل تعهدك. هذا سيجلب الإغاثة التي تشتد الحاجة إليها.</p>
        </div>
      ) : (
        <div className="py-4">
          <p className="mb-4">
            سيستخدم شريك محلي تبرعك لشراء وتسليم المواد المطلوبة للأسرة في {request.locationName}.
          </p>
          <p className="font-bold text-lg mb-4">تبرع وهمي: $50</p>
          <Button onClick={handlePledge} className="w-full" size="lg">
            تأكيد التعهد
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">هذا تدفق تبرع وهمي لنموذج الهاكاثون.</p>
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
  
  const statusTranslations: { [key in AidRequest['status']]: string } = {
    Needed: 'مطلوب',
    Pledged: 'تم التعهد',
    Fulfilled: 'تم التلبية',
  };

  const categoryTranslations: { [key in AidRequest['category']]: string } = {
    Food: 'طعام',
    Medicine: 'دواء',
    Shelter: 'مأوى',
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
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
            <CardTitle className="text-lg font-bold">طلب {categoryTranslations[request.category]}</CardTitle>
            <Badge variant={getStatusVariant(request.status)}>{statusTranslations[request.status]}</Badge>
        </div>
        <CardDescription className="pt-2">{request.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 ml-2" />
            <span>أسرة مكونة من {request.familySize} أفراد</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 ml-2" />
            <span>{request.locationName}</span>
        </div>
      </CardContent>
       {request.status === 'Fulfilled' && request.feedback && (
        <div className="px-6 pb-4 pt-0 text-sm">
           <div className="flex items-center gap-2 font-semibold text-muted-foreground mb-2">
            <MessageSquareQuote className="h-4 w-4" />
            <span>رسالة شكر من المستلم</span>
           </div>
          <blockquote className="border-r-2 border-primary/50 pr-3 italic text-muted-foreground">
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
                  <HandHeart className="ml-2 h-4 w-4" />
                  تبرع
                </Button>
             </DialogTrigger>
             <DonateDialog request={request} />
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

  useEffect(() => {
    const unsubscribe = onSnapshot(aidRequestsCollection, 
      (snapshot) => {
        let aidData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AidRequest));
        // Fallback to mock data if Firestore is empty
        if (aidData.length === 0) {
            aidData = mockAidRequests.map((req, index) => ({...req, id: `mock-${index}`}));
        }
        setRequests(aidData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching aid requests:", error);
        toast({
            variant: "destructive",
            title: "خطأ",
            description: "تعذر جلب طلبات المساعدة. يتم الآن عرض بيانات وهمية."
        })
        // Fallback to mock data on error
        setRequests(mockAidRequests.map((req, index) => ({...req, id: `mock-${index}`})));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

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
