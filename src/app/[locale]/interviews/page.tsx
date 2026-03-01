import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale, Interview } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Calendar, User, FileText } from 'lucide-react';

interface InterviewsContent {
  title: string;
  subtitle: string;
  introduction: string;
  interviews: Interview[];
  note: string;
}

async function getContent(locale: Locale): Promise<InterviewsContent> {
  const filePath = join(process.cwd(), 'src/content/interviews', `${locale}.json`);
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale as Locale);

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'written':
        return '📝';
      case 'audio':
        return '🎙️';
      case 'video':
        return '🎥';
      case 'poem':
        return '📜';
      case 'song':
        return '🎵';
      case 'drawing':
        return '🎨';
      default:
        return '💭';
    }
  };

  const getFormatLabel = (format: string) => {
    const labels: Record<string, { en: string; es: string }> = {
      written: { en: 'Written', es: 'Escrito' },
      audio: { en: 'Audio', es: 'Audio' },
      video: { en: 'Video', es: 'Video' },
      poem: { en: 'Poem', es: 'Poema' },
      song: { en: 'Song', es: 'Canción' },
      drawing: { en: 'Drawing', es: 'Dibujo' },
      other: { en: 'Other', es: 'Otro' },
    };
    return labels[format]?.[locale as 'en' | 'es'] || format;
  };

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

        {/* Introduction */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">{content.introduction}</p>
          </CardContent>
        </Card>

        {/* Interviews */}
        <div className="space-y-6">
          {content.interviews.map((interview) => (
            <Card key={interview.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-base">
                        {locale === 'en' ? 'Interview' : 'Entrevista'} {interview.number}
                      </Badge>
                      <span className="text-3xl">{getFormatIcon(interview.format)}</span>
                    </div>
                    <CardTitle className="text-2xl">
                      {locale === 'en' ? `Interview ${interview.number}` : `Entrevista ${interview.number}`}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {interview.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{interview.date}</span>
                    </div>
                  )}
                  {interview.interviewer && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{interview.interviewer}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <Badge variant="outline">{getFormatLabel(interview.format)}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="mb-2 font-semibold">
                    {locale === 'en' ? 'Interview Content' : 'Contenido de la Entrevista'}
                  </h4>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                    {interview.content}
                  </p>
                </div>

                {/* Reflection */}
                <div className="border-t pt-4">
                  <h4 className="mb-2 font-semibold text-primary">
                    {locale === 'en' ? 'Reflection' : 'Reflexión'}
                  </h4>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                    {interview.reflection}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {locale === 'en' ? 'Note: ' : 'Nota: '}
              </span>
              {content.note}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
