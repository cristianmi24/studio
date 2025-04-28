'use client';

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl'; // Import useTranslations

export function ContactSection() {
  const t = useTranslations('ContactSection'); // Initialize translations
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast({
        title: t('toast_error_title'), // Translate toast title
        description: t('toast_error_desc'), // Translate toast description
        variant: "destructive",
      });
      return;
    }

    // Consider translating the subject prefix if needed, or keep it generic
    const subject = encodeURIComponent(`Consulta OVA: ${name}`);
    // Body labels can remain in the base language (e.g., Spanish) or be translated if the recipient might be different
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
    // Replace with actual destination email
    const mailtoLink = `mailto:correo.destino@ejemplo.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

     toast({
        title: t('toast_success_title'), // Translate success title
        description: t('toast_success_desc'), // Translate success description
      });

     console.log("Mailto link generated:", mailtoLink);
  };

  return (
    <section id="contacto" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
         {t('title')} {/* Translate section title */}
      </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
            <CardTitle>{t('card_title')}</CardTitle> {/* Translate card title */}
            <CardDescription>
                 {t('card_desc')} {/* Translate card description */}
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                 {/* Translate label */}
                <Label htmlFor="name">{t('label_name')}</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder={t('placeholder_name')} // Translate placeholder
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                     aria-required="true"
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                 {/* Translate label */}
                <Label htmlFor="email">{t('label_email')}</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder={t('placeholder_email')} // Translate placeholder
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                     aria-required="true"
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                 {/* Translate label */}
                <Label htmlFor="message">{t('label_message')}</Label>
                <Textarea
                    id="message"
                    placeholder={t('placeholder_message')} // Translate placeholder
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                     aria-required="true"
                    rows={5}
                />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                   {t('button_send')} {/* Translate button text */}
                </Button>
            </form>
            </CardContent>
        </Card>
    </section>
  );
}
