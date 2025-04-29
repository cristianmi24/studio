
'use client'; // Potentially client component if interactions are added

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Linkedin, Github, Instagram } from "lucide-react";
import Link from "next/link"; // Use standard next/link, no locale needed for external links
import { useTranslations } from 'next-intl'; // Import useTranslations

// Keep member data structure, translations will be applied during render
const teamMembersData = [
  {
    id: 1, // Added ID for easier key mapping in translations
    nameKey: "member_1_name", // Key for translation file
    roleKey: "role_1",       // Key for translation file
    imageUrl: "https://pbs.twimg.com/profile_images/1909817501640175616/gM7Wv4cw_400x400.jpg", // Path relative to the `public` directory
    social: {
      linkedin: "https://linkedin.com/in/username1",
      github: "https://github.com/username1",
      instagram: "https://instagram.com/username1",
    },
    fallback: "N1",
  },
  {
    id: 2,
    nameKey: "member_2_name",
    roleKey: "role_2",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHXYLM__g3Mqg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677090533027?e=1751500800&v=beta&t=cn8p_F1NyzlqFsUBpBuBME1Z4gBvADgHA-I79k5aeBI",
    social: {
      linkedin: "https://linkedin.com/in/username2",
      github: "https://github.com/username2",
      instagram: "https://instagram.com/username2",
    },
     fallback: "N2",
  },
  {
    id: 3,
    nameKey: "member_3_name",
    roleKey: "role_3",
    imageUrl: "https://pbs.twimg.com/profile_images/1856212805537394688/UdaqYNUk_400x400.jpg",
    social: {
      linkedin: "https://linkedin.com/in/username3",
      github: "https://github.com/username3",
      instagram: "https://instagram.com/username3",
    },
     fallback: "N3",
  },
];

export function CreditsSection() {
  const t = useTranslations('CreditsSection'); // Initialize translations

  return (
    <section id="creditos" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
         {t('title')} {/* Translate section title */}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembersData.map((member) => {
           const name = t(member.nameKey); // Get translated name
           const role = t(member.roleKey); // Get translated role
           return (
             <Card key={member.id} className="flex flex-col items-center text-center p-6 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                {/* Ensure the src path is correct relative to the public folder */}
                <AvatarImage src={member.imageUrl} alt={`${t('alt_photo_prefix') || 'Photo of'} ${name}`} />
                <AvatarFallback className="text-2xl bg-muted">{member.fallback}</AvatarFallback>
                </Avatar>
                <CardHeader className="p-0">
                <CardTitle className="text-xl font-bold mb-1">{name}</CardTitle>
                <CardDescription className="text-primary font-medium">{role}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex gap-4">
                {member.social.linkedin && (
                    <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} LinkedIn`}>
                    <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    </Link>
                )}
                {member.social.github && (
                    <Link href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub`}>
                    <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    </Link>
                )}
                {member.social.instagram && (
                    <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name} Instagram`}>
                    <Instagram className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    </Link>
                )}
                </CardContent>
             </Card>
            );
        })}
      </div>
    </section>
  );
}
