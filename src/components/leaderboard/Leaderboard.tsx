'use client';

import { useState } from 'react';
import { mockContributors } from '@/lib/mock-data';
import type { Contributor } from '@/lib/types';
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

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <ShieldCheck className="h-5 w-5 text-orange-400" />;
    return <span className="text-sm font-bold">{rank}</span>;
}

const ContributorRow = ({ contributor }: { contributor: Contributor }) => (
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
          <p className="text-xs text-muted-foreground">{contributor.type}</p>
        </div>
      </div>
    </TableCell>
    <TableCell className="text-right font-semibold text-primary">{contributor.contributions}</TableCell>
  </TableRow>
);

export function Leaderboard() {
  const [contributors] = useState<Contributor[]>(mockContributors.sort((a, b) => a.rank - b.rank));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors</CardTitle>
        <CardDescription>
          Recognizing the top contributors to our community's well-being.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Contributor</TableHead>
              <TableHead className="text-right">Contributions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contributors.map((contributor) => (
              <ContributorRow key={contributor.id} contributor={contributor} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
