'use client'; // Hero Section likely needs client-side interactions or hooks eventually

import { Button } from "@/components/ui/button";
import Link from "next/link"; // Using next/link, locale prefixing handled by middleware/routing
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl'; // Import next-intl hooks

export function HeroSection() {
  const t = useTranslations('HeroSection'); // Initialize translations for HeroSection
  const locale = useLocale(); // Get current locale if needed for links

  return (
    <section id="inicio" className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#1976D2] to-[#008080] text-transparent bg-clip-text">
               {t('welcome')} {/* Translate */}
            </span>{" "}
             {t('app_name')} {/* Translate */}
          </h1>{" "}
          <h2 className="inline">
             {t('subtitle_intro')}{" "} {/* Translate */}
            <span className="inline bg-gradient-to-r from-[#008080] to-[#1976D2] text-transparent bg-clip-text">
               {t('subtitle_topic')} {/* Translate */}
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
           {t('description')} {/* Translate */}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
           {/* Link target might need locale if not handled automatically */}
          <Button className="w-full md:w-1/3" asChild>
            <Link href={`/${locale}/contenido`}>{t('start_learning')}</Link> {/* Translate & Add Locale */}
          </Button>
        </div>
          <h3 className="text-2xl font-bold pt-8">{t('objectives_title')}</h3> {/* Translate */}
          <ul className="list-disc list-inside text-muted-foreground space-y-2 text-left mx-auto lg:mx-0 md:w-10/12">
             {/* Translate objectives */}
            <li>{t('objective_1')}</li>
            <li>{t('objective_2')}</li>
            <li>{t('objective_3')}</li>
            <li>{t('objective_4')}</li>
          </ul>
      </div>

      {/* Hero Image */}
      <div className="z-10 order-first lg:order-last flex justify-center items-center">
        <Image
          src="https://picsum.photos/seed/data-study/600/400" // Placeholder image related to data/studying
           // Alt text can be translated if needed, but might be less critical
          alt={t('app_name')} // Simple alt text using app name
          width={600}
          height={400}
          className="rounded-lg shadow-xl object-cover"
          priority // Load the image with priority as it's in the hero section
        />
      </div>

    </section>
  );
}
