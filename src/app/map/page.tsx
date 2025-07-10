import { CrisisMap } from '@/components/map/CrisisMap';
import { SubmitAlertForm } from '@/components/map/SubmitAlertForm';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Megaphone } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)]">
        <CrisisMap />
        <div className="absolute bottom-6 right-6 z-30">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full h-16 w-16 shadow-lg">
                <Megaphone className="h-8 w-8" />
                <span className="sr-only">Post Alert</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Post a Crisis Alert</SheetTitle>
                <SheetDescription>
                  Share real-time information with your community. Your report can save lives. Use your voice or type.
                </SheetDescription>
              </SheetHeader>
              <SubmitAlertForm />
            </SheetContent>
          </Sheet>
        </div>
    </div>
  );
}
