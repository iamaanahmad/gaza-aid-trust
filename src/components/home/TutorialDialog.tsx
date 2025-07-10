'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Map, HandHeart, Calculator, Trophy } from 'lucide-react';

export function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-background/20 text-white border-white hover:bg-background/30 hover:text-white">
            <HelpCircle className="mr-2 h-5 w-5" />
            How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold">How "Gaza Aid & Trust" Works</DialogTitle>
          <DialogDescription>
            A quick guide to using our platform for community support.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
            <div className="flex items-start gap-4">
                <Map className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">Crisis Map</h4>
                    <p className="text-muted-foreground">View and post real-time alerts. Confirm or dispute alerts to help keep information accurate. Your feedback trains our AI to calculate trust scores.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <HandHeart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">Aid Connect</h4>
                    <p className="text-muted-foreground">Families in Gaza can request essential items. Donors can browse requests and pledge support. Feedback from recipients builds trust.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Calculator className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">Zakat Calculator</h4>
                    <p className="text-muted-foreground">Easily calculate your annual Zakat. You can choose to donate your Zakat to aid requests on the platform.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Trophy className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">Community Leaderboard</h4>
                    <p className="text-muted-foreground">See the impact of our community. Top reporters and donors are recognized for their contributions.</p>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
