
import { getModuleById, type Module } from '@/lib/modules-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image'; // Import next/image

// Define params type based on the dynamic segment name
interface ModulePageParams {
  moduleId: string;
}

// Generate static paths for each module
export async function generateStaticParams(): Promise<ModulePageParams[]> {
  // Dynamically import modules data here if needed or use the imported one
  const { modules } = await import('@/lib/modules-data');
  return modules.map((module) => ({
    moduleId: module.id,
  }));
}

export default function ModulePage({ params }: { params: ModulePageParams }) {
  const module = getModuleById(params.moduleId);

  if (!module) {
    notFound(); // Show 404 if module doesn't exist
  }

  const Icon = module.icon;

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 3}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index} className={`text-${4 - (block.level || 3)}xl font-semibold mt-6 mb-3`}>{block.text}</HeadingTag>;
      case 'paragraph':
        return <p key={index} className="mb-4 text-base leading-relaxed">{block.text}</p>;
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 pl-4">
            {block.items?.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        );
      case 'image':
         return (
            <div key={index} className="my-6 flex justify-center">
             <Image
                src={block.src || 'https://picsum.photos/600/300'} // Provide a default placeholder
                alt={block.alt || 'Module image'}
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

  return (
    <div className="container py-12 md:py-20">
       <Button variant="outline" asChild className="mb-8">
            {/* Updated link to point to /contenido */}
            <Link href="/contenido">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Contenido
            </Link>
       </Button>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 bg-muted p-6 rounded-t-lg">
          <Icon className="w-10 h-10 text-primary" />
          <div>
            <CardTitle className="text-3xl font-bold">{module.title}</CardTitle>
            <CardDescription className="text-lg mt-1">{module.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          {module.detailedContent.map(renderContentBlock)}
        </CardContent>
      </Card>

        {/* Optional: Navigation between modules */}
        {/* <div className="mt-12 flex justify-between">
            <Button variant="outline" disabled={params.moduleId === 'module-1'}>Anterior</Button>
            <Button variant="outline" disabled={params.moduleId === 'module-4'}>Siguiente</Button>
        </div> */}
    </div>
  );
}
