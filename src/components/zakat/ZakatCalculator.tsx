'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Calculator } from 'lucide-react';

const zakatFormSchema = z.object({
  cash: z.coerce.number().min(0).default(0),
  gold: z.coerce.number().min(0).default(0),
  silver: z.coerce.number().min(0).default(0),
  investments: z.coerce.number().min(0).default(0),
  other: z.coerce.number().min(0).default(0),
});

type ZakatFormValues = z.infer<typeof zakatFormSchema>;

export function ZakatCalculator() {
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);

  const form = useForm<ZakatFormValues>({
    resolver: zodResolver(zakatFormSchema),
    defaultValues: {
      cash: 0,
      gold: 0,
      silver: 0,
      investments: 0,
      other: 0,
    },
  });

  function onSubmit(data: ZakatFormValues) {
    const totalAssets = data.cash + data.gold + data.silver + data.investments + data.other;
    const zakat = totalAssets * 0.025;
    setZakatAmount(zakat);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cash on Hand & in Bank</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value of Gold</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="silver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value of Silver</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value of Investments</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Assets</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Calculate Zakat
          </Button>
        </form>
      </Form>

      {zakatAmount !== null && (
        <Alert className="mt-8 text-center">
            <Calculator className="h-4 w-4" />
            <AlertTitle className="font-headline text-lg">Your Total Zakat Due</AlertTitle>
            <AlertDescription>
                <p className="text-4xl font-bold text-primary my-2 font-headline">
                ${zakatAmount.toFixed(2)}
                </p>
                <p className="text-muted-foreground mt-2">
                You can fulfill this obligation by helping those in need in Gaza.
                </p>
                <Button asChild className="mt-4">
                <Link href="/aid">Donate Your Zakat</Link>
                </Button>
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
