
import { getModuleById, type Module } from '@/lib/modules-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Use next/link
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'; // Import for translations
import { locales } from '@/i18n'; // Import locales

// Define params type based on the dynamic segment name including locale
interface ModulePageParams {
  locale: string;
  moduleId: string;
}

// Generate static paths for each module and locale combination
export async function generateStaticParams(): Promise<Omit<ModulePageParams, 'locale'>[]> {
  // Assuming modules data is static or fetched during build
  const { modules } = await import('@/lib/modules-data'); // Ensure correct path
   // Generate params for each module ID across all locales
   const params = [];
    for (const locale of locales) {
        for (const module of modules) {
            params.push({ locale: locale, moduleId: module.id });
        }
    }
   // The return type asks for Omit<ModulePageParams, 'locale'>, but next-intl needs locale.
   // Let's return the full params including locale, Next.js should handle it.
   return modules.map((module) => ({
     moduleId: module.id,
     // locale is handled by the directory structure / folder generation
   }));
}


export default async function ModulePage({ params }: { params: ModulePageParams }) {
  // Set locale for request - important for server components using translations
   unstable_setRequestLocale(params.locale);

  const module = getModuleById(params.moduleId); // Fetch module data (this should be locale-agnostic)
  const t = await getTranslations('ModulePage'); // Get translation function for this page

  if (!module) {
    notFound(); // Show 404 if module doesn't exist
  }

  // Use the module's original icon component
  const Icon = module.icon;

  // Rendering content blocks remains the same as content is assumed locale-agnostic here
   const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 3}` as keyof JSX.IntrinsicElements;
        // Translate heading text if available, otherwise fallback to original text
        return <HeadingTag key={index} className={`text-${4 - (block.level || 3)}xl font-semibold mt-6 mb-3`}>{ block.text }</HeadingTag>;
      case 'paragraph':
         // Translate paragraph text if available, otherwise fallback to original text
        return <p key={index} className="mb-4 text-base leading-relaxed">{block.text}</p>;
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 pl-4">
            {/* Translate list items if available */}
            {block.items?.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        );
      case 'image':
         return (
            <div key={index} className="my-6 flex justify-center">
             <Image
                src={block.src || 'https://picsum.photos/600/300'} // Provide a default placeholder
                alt={block.alt || 'Module image'} // Translate alt text if needed
                width={600}
                height={300}
                className="rounded-lg shadow-md object-cover"
             />
            </div>
          );
      default:
        return null;
    }
  };

  // Translate module title and description
  // Assuming module data itself doesn't contain translations, we might need a mapping or
  // structure the module data differently if title/description need translation.
  // For now, using original data.
  const moduleTitle = module.title;
  const moduleDescription = module.description;


  return (
    <div className="container py-12 md:py-20">
       {/* Update Link href to include locale */}
       {/* Removed asChild to fix error, wrap Link content in a span */}
       <Button variant="outline" className="mb-8">
            <Link href={`/${params.locale}/contenido`} className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>{t('back_to_content')}</span> {/* Wrap text in span */}
            </Link>
       </Button>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 bg-muted p-6 rounded-t-lg">
           {Icon && <Icon className="w-10 h-10 text-primary" />}
          <div>
            <CardTitle className="text-3xl font-bold">{moduleTitle}</CardTitle>
            <CardDescription className="text-lg mt-1">{moduleDescription}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
           {/* Render detailed content - currently assumes content itself is not translated */}
          {module.detailedContent.map(renderContentBlock)}
        </CardContent>
      </Card>

        {/* Optional: Navigation between modules - Links would need locale */}
        {/* <div className="mt-12 flex justify-between">
            <Button variant="outline" disabled={params.moduleId === 'module-1'}><Link href={`/${params.locale}/modules/prev-id`}>Anterior</Link></Button>
            <Button variant="outline" disabled={params.moduleId === 'module-4'}><Link href={`/${params.locale}/modules/next-id`}>Siguiente</Link></Button>
        </div> */}
    </div>
  );
}

