import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Github, Instagram } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'; // Use next/image for optimized images

const teamMembers = [
  {
    name: "Nombre Completo 1",
    role: "Diseñador Instruccional",
    imageUrl: "https://picsum.photos/seed/person1/100/100", // Placeholder image
    social: {
      linkedin: "https://linkedin.com/in/username1",
      github: "https://github.com/username1",
      instagram: "https://instagram.com/username1",
    },
    fallback: "N1",
  },
  {
    name: "Nombre Completo 2",
    role: "Desarrollador Frontend",
    imageUrl: "https://picsum.photos/seed/person2/100/100", // Placeholder image
    social: {
      linkedin: "https://linkedin.com/in/username2",
      github: "https://github.com/username2",
      instagram: "https://instagram.com/username2",
    },
     fallback: "N2",
  },
  {
    name: "Nombre Completo 3",
    role: "Experto en Contenido",
    imageUrl: "https://picsum.photos/seed/person3/100/100", // Placeholder image
    social: {
      linkedin: "https://linkedin.com/in/username3",
      github: "https://github.com/username3",
      instagram: "https://instagram.com/username3",
    },
     fallback: "N3",
  },
];

export function CreditsSection() {
  return (
    <section id="creditos" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Créditos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
            <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
              <AvatarImage src={member.imageUrl} alt={`Foto de ${member.name}`} />
              <AvatarFallback className="text-2xl bg-muted">{member.fallback}</AvatarFallback>
            </Avatar>
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-bold mb-1">{member.name}</CardTitle>
              <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4 flex gap-4">
              {member.social.linkedin && (
                <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                  <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              )}
               {member.social.github && (
                <Link href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}>
                  <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              )}
               {member.social.instagram && (
                <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Instagram`}>
                  <Instagram className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
