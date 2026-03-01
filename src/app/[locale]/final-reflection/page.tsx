import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Clock, CheckCircle2 } from 'lucide-react';

interface FinalReflectionContent {
  title: string;
  subtitle: string;
  availableDate: string;
  placeholder: {
    title: string;
    message: string;
    whatToExpect: string[];
  };
}

async function getContent(locale: Locale): Promise<FinalReflectionContent> {
  const filePath = join(process.cwd(), 'src/content/final-reflection', `${locale}.json`);
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function FinalReflectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale as Locale);

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {content.title}
          </h1>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        {/* Availability Notice */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  {locale === 'en' ? 'Available' : 'Disponible'}: {content.availableDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="h-6 w-6 text-muted-foreground" />
              {content.placeholder.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {content.placeholder.message}
            </p>

            {/* What to Expect */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                {locale === 'en' ? 'What to Expect in the Final Reflection:' : 'Qué Esperar en la Reflexión Final:'}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.placeholder.whatToExpect.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'en' ? 'CAS Journey Progress' : 'Progreso del Viaje CAS'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {locale === 'en' ? 'Experiences Completed' : 'Experiencias Completadas'}
                </span>
                <Badge variant="secondary">
                  {locale === 'en' ? 'In Progress' : 'En Progreso'}
                </Badge>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: '15%' }} // Will update as more experiences are added
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en'
                  ? 'The final reflection will be completed once all CAS requirements are fulfilled.'
                  : 'La reflexión final se completará una vez que se cumplan todos los requisitos de CAS.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
