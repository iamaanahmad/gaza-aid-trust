import { ZakatCalculator } from '@/components/zakat/ZakatCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ZakatPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">حاسبة الزكاة</CardTitle>
          <CardDescription className="text-lg">
            احسب صدقتك الواجبة واصنع فرقًا.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-center">
            الزكاة هي أحد أركان الإسلام الخمسة. وهو مصطلح مالي إسلامي يشير إلى الالتزام الذي على الفرد بالتبرع بنسبة معينة من الثروة كل عام للأعمال الخيرية. تُحسب الزكاة بنسبة 2.5٪ من مدخراتك وثروتك.
          </p>
          <ZakatCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
