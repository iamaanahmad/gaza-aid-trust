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
            <HelpCircle className="ml-2 h-5 w-5" />
            كيف يعمل
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold">كيف يعمل "عون وثقة غزة"</DialogTitle>
          <DialogDescription>
            دليل سريع لاستخدام منصتنا للدعم المجتمعي.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
            <div className="flex items-start gap-4">
                <Map className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">خريطة الأزمات</h4>
                    <p className="text-muted-foreground">عرض ونشر تنبيهات فورية. قم بتأكيد أو نفي التنبيهات للمساعدة في الحفاظ على دقة المعلومات. ملاحظاتك تدرب الذكاء الاصطناعي لدينا لحساب درجات الثقة.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <HandHeart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">توصيل المساعدات</h4>
                    <p className="text-muted-foreground">يمكن للأسر في غزة طلب المواد الأساسية. يمكن للمانحين تصفح الطلبات والتعهد بالدعم. ملاحظات المستلمين تبني الثقة.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Calculator className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">حاسبة الزكاة</h4>
                    <p className="text-muted-foreground">احسب زكاتك السنوية بسهولة. يمكنك اختيار التبرع بزكاتك لطلبات المساعدة على المنصة.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Trophy className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold">لوحة الشرف للمجتمع</h4>
                    <p className="text-muted-foreground">شاهد تأثير مجتمعنا. يتم تكريم أفضل المراسلين والمانحين لمساهماتهم.</p>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
