'use client';

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Use ShadCN Textarea
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; // Import useToast

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Consulta OVA: ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
    const mailtoLink = `mailto:correo.destino@ejemplo.com?subject=${subject}&body=${body}`; // Replace with actual destination email

    // Attempt to open mail client
    window.location.href = mailtoLink;

     // Provide user feedback - Note: This doesn't confirm the email was sent
     toast({
        title: "¡Listo!",
        description: "Se abrirá tu cliente de correo para enviar el mensaje.",
      });

    // Optionally clear the form (or keep data if mailto fails)
     // setName('');
     // setEmail('');
     // setMessage('');

     console.log("Mailto link generated:", mailtoLink); // For debugging
  };

  return (
    <section id="contacto" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Ayuda y Contacto
      </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
            <CardTitle>Envíanos tu consulta</CardTitle>
            <CardDescription>
                ¿Tienes preguntas, sugerencias o encontraste algún problema? Déjanos tu mensaje.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                     aria-required="true"
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="tu.correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                     aria-required="true"
                />
                </div>
                <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                    id="message"
                    placeholder="Escribe aquí tu consulta o comentario..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                     aria-required="true"
                    rows={5}
                />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
            </form>
            </CardContent>
        </Card>
    </section>
  );
}
