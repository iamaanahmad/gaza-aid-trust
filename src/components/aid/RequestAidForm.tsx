'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const requestAidSchema = z.object({
  category: z.enum(['Food', 'Medicine', 'Shelter'], { required_error: 'Please select a category.' }),
  description: z.string().min(10, 'Please provide a detailed description.').max(200),
  familySize: z.coerce.number().min(1, 'Family size must be at least 1.'),
  locationName: z.string().min(3, 'Please provide a location.'),
  photo: z.any().optional(),
});

type RequestAidFormValues = z.infer<typeof requestAidSchema>;

export function RequestAidForm() {
    const { toast } = useToast();
  const form = useForm<RequestAidFormValues>({
    resolver: zodResolver(requestAidSchema),
  });

  function onSubmit(data: RequestAidFormValues) {
    // In a real app, this would submit to a backend.
    console.log(data);
    toast({
        title: "Request Submitted",
        description: "Your aid request has been posted. We will notify you of updates.",
    });
    // Here you would typically close the dialog as well
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aid Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Shelter">Shelter</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of Need</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Need rice and clean water for family..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="familySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Khan Younis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Photo</FormLabel>
              <FormControl>
                <Input type="file" className="flex items-center pt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit Request</Button>
      </form>
    </Form>
  );
}
