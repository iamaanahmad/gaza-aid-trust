
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
import { addDoc } from 'firebase/firestore';
import { aidRequestsCollection, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { AidRequest } from '@/lib/types';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

export function RequestAidForm({ onFormSubmit }: { onFormSubmit: () => void }) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();

    const requestAidSchema = z.object({
      category: z.enum(['Food', 'Medicine', 'Shelter'], { required_error: t('validation_category_required') }),
      priority: z.enum(['High', 'Medium', 'Low'], { required_error: t('validation_priority_required') }),
      description: z.string().min(10, t('validation_description_min')).max(200),
      familySize: z.coerce.number().min(1, t('validation_family_size_min')),
      locationName: z.string().min(3, t('validation_location_min')),
      photo: z.instanceof(FileList).optional(),
    });

    type RequestAidFormValues = z.infer<typeof requestAidSchema>;
    
    const form = useForm<RequestAidFormValues>({
      resolver: zodResolver(requestAidSchema),
      defaultValues: {
        description: '',
        locationName: '',
        priority: 'Low',
      }
    });

  async function onSubmit(data: RequestAidFormValues) {
    setIsSubmitting(true);
    try {
        let photoUrl: string | undefined = undefined;

        if (data.photo && data.photo.length > 0) {
            const file = data.photo[0];
            const storageRef = ref(storage, `aid-requests/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            photoUrl = await getDownloadURL(snapshot.ref);
        }

        const newRequest: Omit<AidRequest, 'id'> = {
            requesterId: 'anonymous-user', // Placeholder
            category: data.category,
            priority: data.priority,
            description: data.description,
            familySize: data.familySize,
            locationName: data.locationName,
            status: 'Needed',
            timestamp: Date.now(),
            photoUrl: photoUrl || 'https://placehold.co/600x400.png',
        };

        await addDoc(aidRequestsCollection, newRequest);
        
        toast({
            title: t('toast_request_submitted'),
            description: t('toast_request_submitted_desc'),
        });
        form.reset();
        onFormSubmit();
    } catch (error) {
        console.error("Error submitting aid request:", error);
        toast({
            variant: "destructive",
            title: t('toast_submission_error'),
            description: t('toast_request_submission_error_desc'),
        });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const photoRef = form.register("photo");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('form_label_category')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={t('form_placeholder_select_category')} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="Food">{t('category_food')}</SelectItem>
                    <SelectItem value="Medicine">{t('category_medicine')}</SelectItem>
                    <SelectItem value="Shelter">{t('category_shelter')}</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('priority_label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form_placeholder_select_priority')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">{t('priority_low')}</SelectItem>
                      <SelectItem value="Medium">{t('priority_medium')}</SelectItem>
                      <SelectItem value="High">{t('priority_high')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_description')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('form_placeholder_description_aid')} {...field} />
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
                <FormLabel>{t('form_label_family_size')}</FormLabel>
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
                <FormLabel>{t('form_label_location')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form_placeholder_location')} {...field} />
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
              <FormLabel>{t('form_label_photo')}</FormLabel>
              <FormControl>
                <Input type="file" className="flex items-center pt-2" {...photoRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('submitting_button') : t('submit_request_button')}
        </Button>
      </form>
    </Form>
  );
}
