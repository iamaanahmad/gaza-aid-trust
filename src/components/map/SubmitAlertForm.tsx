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
import { useEffect, useState } from 'react';

const alertSchema = z.object({
  description: z.string().min(10, 'Please provide more details.').max(200),
  locationName: z.string().min(3, 'Please provide a location name.'),
});

type AlertFormValues = z.infer<typeof alertSchema>;

// Mock Web Speech API hook
const useSpeechRecognition = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            setHasRecognitionSupport(true);
        }
    }, []);

    const startListening = () => {
        setIsListening(true);
        // In a real app, you would use the SpeechRecognition API
        toast({
            title: "Listening...",
            description: "Please speak now. (This is a 2-second mock)"
        });
        setTimeout(() => {
            setText('Mocked speech to text: food and water available at the main square.');
            setIsListening(false);
        }, 2000);
    };

    return { text, isListening, startListening, hasRecognitionSupport };
};

export function SubmitAlertForm() {
  const { toast } = useToast();
  const { text, isListening, startListening, hasRecognitionSupport } = useSpeechRecognition();

  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertSchema),
    defaultValues: { description: '', locationName: '' },
  });

  useEffect(() => {
    if (text) {
      form.setValue('description', text);
    }
  }, [text, form]);

  function onSubmit(data: AlertFormValues) {
    console.log(data);
    toast({
        title: "Alert Submitted!",
        description: "Thank you for helping your community. Your alert is now live.",
    });
    // Here you would typically close the sheet
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Textarea
                    placeholder="e.g., Safe route to Rafah open..."
                    className="flex-grow"
                    {...field}
                  />
                  {hasRecognitionSupport && (
                    <Button type="button" size="icon" onClick={startListening} disabled={isListening} aria-label="Use voice input">
                      <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                    </Button>
                  )}
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
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Khan Younis Center" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Post Alert
        </Button>
      </form>
    </Form>
  );
}
