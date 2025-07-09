import { AidFeed } from '@/components/aid/AidFeed';
import { RequestAidForm } from '@/components/aid/RequestAidForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HandHeart } from 'lucide-react';

export default function AidPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline">Aid Connect</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Connect directly with families in Gaza. Fulfill a need, share a hope.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <HandHeart className="mr-2 h-5 w-5" />
              Request Aid
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit an Aid Request</DialogTitle>
              <DialogDescription>
                Please describe your needs clearly. Your request will be visible to donors.
              </DialogDescription>
            </DialogHeader>
            <RequestAidForm />
          </DialogContent>
        </Dialog>
      </div>
      <AidFeed />
    </div>
  );
}
