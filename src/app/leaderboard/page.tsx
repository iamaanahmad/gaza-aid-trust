import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
        <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold font-headline mt-4">Community Leaderboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Celebrating those who power our community with their contributions.
            </p>
        </div>
      <Leaderboard />
    </div>
  );
}
