
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
import { Mic, Send } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { addDoc } from 'firebase/firestore';
import { alertsCollection } from '@/lib/firebase';
import type { Alert, AlertPriority } from '@/lib/types';
import { useTranslation } from '@/hooks/use-translation';

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: ((this: SpeechRecognition, ev: any) => any) | null;
    onerror: ((this: SpeechRecognition, ev: any) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

const useSpeechRecognition = (lang: string) => {
    const { toast } = useToast();
    const { t } = useTranslation();
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
            timeoutRef.current = setTimeout(() => {
                if (isListening) stopListening();
            }, 30000);
        }
    }, [isListening, stopListening]);
    
    const initializeRecognition = useCallback((onTranscriptUpdate: (transcript: string) => void) => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({
                variant: 'destructive',
                title: t('toast_unsupported_browser'),
                description: t('toast_unsupported_browser_desc'),
            });
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang;

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((result: any) => result[0])
              .map(result => result.transcript)
              .join('');
            onTranscriptUpdate(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error !== 'no-speech') {
                toast({
                    variant: 'destructive',
                    title: t('toast_audio_error'),
                    description: event.error === 'not-allowed' ? 'Mic permission denied.' : t('toast_audio_error_desc'),
                });
            }
             stopListening();
        };

        recognition.onend = () => {
             stopListening();
        };
    }, [lang, t, toast, stopListening]);

    return {
        isListening,
        startListening,
        stopListening,
        initializeRecognition,
        hasSupport: !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    };
};

export function SubmitAlertForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const alertFormSchema = z.object({
    description: z.string().min(10, t('validation_description_min_alert')).max(500),
    locationName: z.string().min(3, t('validation_location_min')),
    priority: z.enum(['High', 'Medium', 'Low'], { required_error: t('validation_priority_required') }),
  })
  
  type AlertFormValues = z.infer<typeof alertFormSchema>;

  const form = useForm<AlertFormValues>({
      resolver: zodResolver(alertFormSchema),
      defaultValues: { description: '', locationName: '', priority: 'Low' },
  });

  const { isListening, startListening, stopListening, initializeRecognition, hasSupport } = useSpeechRecognition(language === 'ar' ? 'ar-EG' : 'en-US');
  
  const getPriorityFromTranscript = (transcript: string) => {
      const lowerTranscript = transcript.toLowerCase();
      const highPriorityKeywords = ['urgent', 'high', 'عاجل', 'خطير'];
      const mediumPriorityKeywords = ['medium', 'متوسط'];

      if (highPriorityKeywords.some(kw => lowerTranscript.includes(kw))) return 'High';
      if (mediumPriorityKeywords.some(kw => lowerTranscript.includes(kw))) return 'Medium';
      return form.getValues('priority'); // Keep existing if no keyword
  }

  useEffect(() => {
    initializeRecognition((transcript) => {
        form.setValue('description', transcript, { shouldValidate: true });
        
        const detectedPriority = getPriorityFromTranscript(transcript);
        form.setValue('priority', detectedPriority);
    });
  }, [initializeRecognition, form]);


  async function onSubmit(data: AlertFormValues) {
    setIsSubmitting(true);
    try {
        const newAlert: Omit<Alert, 'id'> = {
            location: { lat: 31.5, lng: 34.4667 }, // Placeholder
            locationName: data.locationName,
            description: data.description,
            priority: data.priority,
            type: 'triage', // Hardcode as triage for this form
            timestamp: Date.now(),
            reporterId: 'anonymous-user',
            confirmations: 0,
            disputes: 0,
            trustScore: 50,
        };

        await addDoc(alertsCollection, newAlert);

        toast({
            title: t('toast_alert_submitted'),
            description: t('toast_alert_submitted_desc'),
        });
        form.reset();
        onFormSubmit();
    } catch (error) {
        console.error("Error submitting alert:", error);
        toast({
            variant: "destructive",
            title: t('toast_submission_error'),
            description: t('toast_alert_submission_error_desc'),
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleMicClick = () => {
    if (!hasSupport) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_description')}</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Textarea
                    placeholder={t('form_placeholder_description_alert')}
                    className="ltr:pr-12 rtl:pl-12 min-h-[120px]"
                    {...field}
                  />
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost"
                    onClick={handleMicClick} 
                    disabled={!hasSupport}
                    aria-label={isListening ? 'Stop voice input' : t('use_voice_input_label')}
                    className="absolute rtl:left-1 ltr:right-1 top-2 h-8 w-8 text-muted-foreground"
                  >
                    <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="locationName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('form_label_location_name')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('form_placeholder_location_name')} {...field} />
                </FormControl>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
            {isSubmitting ? t('publishing_alert_button') : t('publish_alert_button')}
        </Button>
      </form>
    </Form>
  );
}

    