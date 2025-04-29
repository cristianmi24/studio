
'use client';

import { useState, useRef, type FormEvent } from 'react';
// import emailjs from '@emailjs/browser'; // Removed EmailJS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

// Interface for contact messages
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export function ContactSection() {
  const t = useTranslations('ContactSection');
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Removed EmailJS environment variables

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) {
        setIsSubmitting(false);
        console.error("Form reference is not available.");
        toast({
            title: t('toast_error_title'),
            description: t('toast_internal_error_desc'), // Generic internal error
            variant: "destructive",
          });
        return;
    }


    // Basic validation (HTML5 required attribute should handle this, but added for robustness)
    const nameInput = form.current.elements.namedItem('contact_name') as HTMLInputElement;
    const emailInput = form.current.elements.namedItem('contact_email') as HTMLInputElement;
    const messageInput = form.current.elements.namedItem('contact_message') as HTMLTextAreaElement;

    if (!nameInput?.value || !emailInput?.value || !messageInput?.value) {
      toast({
        title: t('toast_error_title'),
        description: t('toast_fields_required_desc'),
        variant: "destructive",
      });
       setIsSubmitting(false);
      return;
    }

     // Simulate submission delay
    setTimeout(() => {
         try {
            // Get existing messages from localStorage
            const existingMessagesRaw = localStorage.getItem('contactMessages');
            const existingMessages: ContactMessage[] = existingMessagesRaw ? JSON.parse(existingMessagesRaw) : [];

            // Create new message object
            const newMessage: ContactMessage = {
                id: Date.now().toString(), // Simple unique ID
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                timestamp: new Date().toISOString(),
            };

            // Add new message and save back to localStorage
            existingMessages.push(newMessage);
            localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

            console.log('Message saved to localStorage:', newMessage);
            toast({
                title: t('toast_local_success_title'),
                description: t('toast_local_success_desc'),
            });
            form.current?.reset(); // Reset form fields

        } catch (error) {
             console.error('Error saving message to localStorage:', error);
             toast({
                title: t('toast_local_error_title'),
                description: t('toast_local_error_desc'),
                variant: "destructive",
             });
        } finally {
             setIsSubmitting(false); // Re-enable button
        }
    }, 500); // Simulate network delay
  };

  return (
    <section id="contacto" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
         {t('title')}
      </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
            <CardTitle>{t('card_title_local')}</CardTitle> {/* Updated title */}
            <CardDescription>
                 {t('card_desc_local')} {/* Updated description */}
            </CardDescription>
            </CardHeader>
            <CardContent>
            {/* Ensure input names are unique */}
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="contact_name">{t('label_name')}</Label>
                <Input
                    type="text"
                    id="contact_name"
                    name="contact_name" // Changed name
                    placeholder={t('placeholder_name')}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="contact_email">{t('label_email')}</Label>
                <Input
                    type="email"
                    id="contact_email"
                    name="contact_email" // Changed name
                    placeholder={t('placeholder_email')}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="contact_message">{t('label_message')}</Label>
                <Textarea
                    id="contact_message"
                    name="contact_message" // Changed name
                    placeholder={t('placeholder_message')}
                    required
                    aria-required="true"
                    rows={5}
                    disabled={isSubmitting}
                />
                </div>
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('button_saving')} {/* Updated submitting text */}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('button_send')}
                    </>
                  )}
                </Button>
            </form>
             {/* Removed recipient note */}
             <p className="mt-4 text-sm text-muted-foreground text-center">
                 {t('storage_note')} {/* Add note about local storage */}
             </p>
            </CardContent>
        </Card>
         {/* Removed EmailJS specific instructions */}
         <div className="max-w-2xl mx-auto mt-6 p-4 bg-muted rounded-lg text-muted-foreground text-sm">
             <h4 className="font-semibold mb-2 text-foreground">{t('local_storage_info_title')}</h4>
             <p>{t('local_storage_info_desc')}</p>
         </div>
    </section>
  );
}
