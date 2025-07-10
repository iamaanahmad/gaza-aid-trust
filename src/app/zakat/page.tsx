import { ZakatCalculator } from '@/components/zakat/ZakatCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ZakatPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Zakat Calculator</CardTitle>
          <CardDescription className="text-lg">
            Calculate your obligatory charity and make a difference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-center">
            Zakat is one of the Five Pillars of Islam. It is an Islamic finance term referring to the obligation that an individual has to donate a certain proportion of wealth each year to charitable causes. Zakat is calculated at 2.5% of your savings and wealth.
          </p>
          <ZakatCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
