'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mic, Send } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { addDoc } from 'firebase/firestore';
import { alertsCollection } from '@/lib/firebase';
import type { Alert } from '@/lib/types';
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

// Custom hook for Web Speech API
const useSpeechRecognition = (lang: string) => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const { toast } = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = lang;

            recognition.onresult = (event: any) => {
                const currentTranscript = event.results[0][0].transcript;
                setTranscript(currentTranscript);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                toast({
                    variant: 'destructive',
                    title: t('toast_audio_error'),
                    description: t('toast_audio_error_desc'),
                });
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        }
    }, [toast, lang, t]);
    
    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setIsListening(true);
            recognitionRef.current.start();
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            setIsListening(false);
            recognitionRef.current.stop();
        }
    }, [isListening]);

    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        hasSupport: !!recognitionRef.current
    };
};

export function SubmitAlertForm() {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const { transcript, isListening, startListening, hasSupport } = useSpeechRecognition(language === 'ar' ? 'ar-EG' : 'en-US');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const alertSchema = z.object({
    description: z.string().min(10, t('validation_description_min_alert')).max(200),
    locationName: z.string().min(3, t('validation_location_min')),
  });

  type AlertFormValues = z.infer<typeof alertSchema>;

  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertSchema),
    defaultValues: { description: '', locationName: '' },
  });

  useEffect(() => {
    if (transcript) {
      form.setValue('description', transcript);
    }
  }, [transcript, form]);

  async function onSubmit(data: AlertFormValues) {
    setIsSubmitting(true);
    try {
        // For now, we'll use a mock location in Gaza. A real app would use geolocation.
        const newAlert: Omit<Alert, 'id'> = {
            location: { lat: 31.5, lng: 34.4667 }, // Gaza City center
            locationName: data.locationName,
            description: data.description,
            timestamp: Date.now(),
            reporterId: 'anonymous-user', // Placeholder
            confirmations: 0,
            disputes: 0,
            trustScore: 50, // Start with a neutral score
        };

        await addDoc(alertsCollection, newAlert);

        toast({
            title: t('toast_alert_submitted'),
            description: t('toast_alert_submitted_desc'),
        });
        form.reset();
        // Here you would typically close the sheet, which needs state management from the parent
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
    if (!hasSupport) {
        toast({
            variant: 'destructive',
            title: t('toast_unsupported_browser'),
            description: t('toast_unsupported_browser_desc'),
        });
        return;
    }
    if (!isListening) {
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
                    className="ltr:pr-12 rtl:pl-12"
                    {...field}
                  />
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost"
                    onClick={handleMicClick} 
                    disabled={isListening} 
                    aria-label={t('use_voice_input_label')}
                    className="absolute rtl:left-1 ltr:right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                  >
                    <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                  </Button>
                </div>
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
              <FormLabel>{t('form_label_location_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_location_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
            {isSubmitting ? t('publishing_alert_button') : t('publish_alert_button')}
        </Button>
      </form>
    </Form>
  );
}
