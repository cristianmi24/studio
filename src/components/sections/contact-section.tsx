
'use client';

import { useState, useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser'; // Import emailjs
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Loader2 } from 'lucide-react'; // Import Loader2 for loading state
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

export function ContactSection() {
  const t = useTranslations('ContactSection');
  const form = useRef<HTMLFormElement>(null); // Ref for the form element
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch environment variables
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation (optional, as required attribute is set on inputs)
    if (!form.current || !form.current.checkValidity()) {
      toast({
        title: t('toast_error_title'),
        description: t('toast_error_desc'),
        variant: "destructive",
      });
      return;
    }

     // Check if EmailJS credentials are loaded
     if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS environment variables are not configured properly.");
        toast({
            title: t('toast_config_error_title'), // Add this translation key
            description: t('toast_config_error_desc'), // Add this translation key
            variant: "destructive",
        });
        return;
    }


    setIsSubmitting(true);

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          console.log('EmailJS Success:', result.text);
          toast({
            title: t('toast_emailjs_success_title'), // Use new success title
            description: t('toast_emailjs_success_desc'), // Use new success description
          });
          // Reset form fields after successful submission
           if (form.current) {
             form.current.reset();
           }
        },
        (error) => {
          console.error('EmailJS Error:', error.text);
          toast({
            title: t('toast_emailjs_error_title'), // Use new error title
            description: t('toast_emailjs_error_desc'), // Use new error description
            variant: "destructive",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false); // Re-enable button regardless of success or failure
      });
  };

  return (
    <section id="contacto" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
         {t('title')}
      </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
            <CardTitle>{t('card_title')}</CardTitle>
            <CardDescription>
                 {t('card_desc')}
            </CardDescription>
            </CardHeader>
            <CardContent>
            {/* Add ref and ensure input names match EmailJS template variables */}
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">{t('label_name')}</Label>
                <Input
                    type="text"
                    id="name"
                    name="from_name" // Standard EmailJS template variable for sender name
                    placeholder={t('placeholder_name')}
                    required
                    aria-required="true"
                    disabled={isSubmitting} // Disable input during submission
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">{t('label_email')}</Label>
                <Input
                    type="email"
                    id="email"
                    name="reply_to" // Standard EmailJS template variable for reply-to email
                    placeholder={t('placeholder_email')}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">{t('label_message')}</Label>
                <Textarea
                    id="message"
                    name="message" // Standard EmailJS template variable for message content
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
                      {t('button_submitting')} {/* Translate submitting text */}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('button_send')}
                    </>
                  )}
                </Button>
            </form>
            </CardContent>
        </Card>
         {/* Instructions/Explanation about EmailJS */}
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-muted rounded-lg text-muted-foreground text-sm">
            <h4 className="font-semibold mb-2 text-foreground">{t('emailjs_info_title')}</h4>
            <p className="mb-2">{t('emailjs_info_desc1')}</p>
            <ul className="list-disc list-inside space-y-1 mb-2 pl-4">
                <li>{t('emailjs_info_step1')}</li>
                <li>{t('emailjs_info_step2')}</li>
                <li>{t('emailjs_info_step3')}</li>
                <li>{t('emailjs_info_step4')}</li>
            </ul>
            <p className="font-semibold mb-1 text-foreground">{t('emailjs_security_title')}</p>
            <p>{t('emailjs_security_desc')}</p>
        </div>
    </section>
  );
}
