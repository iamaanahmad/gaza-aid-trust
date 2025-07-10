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
          <h1 className="text-4xl font-bold">توصيل المساعدات</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            تواصل مباشرة مع الأسر في غزة. لبِّ حاجة، وشارك أملاً.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <HandHeart className="ml-2 h-5 w-5" />
              اطلب مساعدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إرسال طلب مساعدة</DialogTitle>
              <DialogDescription>
                يرجى وصف احتياجاتك بوضوح. سيكون طلبك مرئيًا للمانحين.
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
