'use client';

import { useState, useEffect } from 'react';
import type { Contributor } from '@/lib/types';
import { contributorsCollection } from '@/lib/firebase';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Medal, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <ShieldCheck className="h-5 w-5 text-orange-400" />;
    return <span className="text-sm font-bold">{rank}</span>;
}

const ContributorRow = ({ contributor }: { contributor: Contributor }) => {
    
    const typeTranslations: { [key in Contributor['type']]: string } = {
        Donor: 'مانح',
        Reporter: 'مراسل',
    }

    return (
        <TableRow>
            <TableCell className="w-16 text-center font-bold">{getRankIcon(contributor.rank)}</TableCell>
            <TableCell>
            <div className="flex items-center gap-4">
                <Avatar>
                <AvatarImage src={contributor.avatarUrl} alt={contributor.name} data-ai-hint="person face" />
                <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                <p className="font-medium">{contributor.name}</p>
                <p className="text-xs text-muted-foreground">{typeTranslations[contributor.type]}</p>
                </div>
            </div>
            </TableCell>
            <TableCell className="text-left font-semibold text-primary">{contributor.contributions}</TableCell>
        </TableRow>
    )
};

const LeaderboardSkeleton = () => (
    <Table>
        <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">الترتيب</TableHead>
              <TableHead>المساهم</TableHead>
              <TableHead className="text-left">المساهمات</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell className="w-16 text-center"><Skeleton className="h-5 w-5 rounded-full mx-auto" /></TableCell>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-16 mt-1" />
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="text-left"><Skeleton className="h-5 w-8 mr-auto" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

export function Leaderboard() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(contributorsCollection, orderBy('rank'));
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const contributorData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contributor));
        setContributors(contributorData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching contributors:", error);
        toast({
            variant: "destructive",
            title: "خطأ",
            description: "تعذر جلب لوحة الشرف. قد تكون البيانات المعروضة قديمة."
        })
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>أبرز المساهمين</CardTitle>
        <CardDescription>
          تكريم لأبرز المساهمين في رفاهية مجتمعنا.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
            <LeaderboardSkeleton />
        ) : (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-16 text-center">الترتيب</TableHead>
                <TableHead>المساهم</TableHead>
                <TableHead className="text-left">المساهمات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contributors.map((contributor) => (
                <ContributorRow key={contributor.id} contributor={contributor} />
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}
