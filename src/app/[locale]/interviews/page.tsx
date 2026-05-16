import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale, Interview } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Calendar, User, FileText } from 'lucide-react';
import Link from 'next/link';

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
  const copy =
    locale === 'en'
      ? {
          eyebrow: 'CAS Interviews',
          introBody:
            'These conversations frame my CAS journey from the beginning, the middle, and the end, so the reflection stays structured and easy to follow.',
          contentLabel: 'Interview content',
          reflectionLabel: 'Reflection',
          noteLabel: 'Note',
          formatLabel: 'Format',
        }
      : {
          eyebrow: 'Entrevistas CAS',
          introBody:
            'Estas conversaciones ordenan mi recorrido CAS desde el inicio, el punto intermedio y el final, para que la reflexión siga una estructura clara y fácil de entender.',
          contentLabel: 'Contenido de la entrevista',
          reflectionLabel: 'Reflexión',
          noteLabel: 'Nota',
          formatLabel: 'Formato',
        };

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
    <div className="bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {copy.eyebrow}
            </p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {content.title}
                </h1>
                <p className="text-xl text-muted-foreground">{content.subtitle}</p>
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {copy.introBody}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-3 text-center">
                <div className="rounded-xl bg-background/80 px-3 py-4">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === 'en' ? 'Interviews' : 'Entrevistas'}
                  </p>
                </div>
                <div className="rounded-xl bg-background/80 px-3 py-4">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === 'en' ? 'Start' : 'Inicio'}
                  </p>
                </div>
                <div className="rounded-xl bg-background/80 px-3 py-4">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === 'en' ? 'Moments' : 'Momentos'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-primary/15 bg-card/90 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {content.introduction}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {content.interviews.map((interview) => (
              <Card key={interview.id} className="overflow-hidden border-border/70 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="default" className="rounded-full px-3 py-1 text-sm">
                          {locale === 'en' ? 'Interview' : 'Entrevista'} {interview.number} / 3
                        </Badge>
                        <span className="text-2xl">{getFormatIcon(interview.format)}</span>
                      </div>
                      <CardTitle className="text-2xl">
                        {locale === 'en'
                          ? `Interview ${interview.number}`
                          : `Entrevista ${interview.number}`}
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {locale === 'en'
                          ? 'A checkpoint to connect preparation, reflection, and next steps.'
                          : 'Un punto de control para conectar preparación, reflexión y siguientes pasos.'}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-sm">
                      {getFormatLabel(interview.format)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
                      <h4 className="mb-3 font-semibold">{copy.contentLabel}</h4>
                      <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                        {(() => {
                          const raw = interview.content || '';
                          const stripped = raw
                            .split('\n')
                            .filter((l) => !l.trim().startsWith('#'))
                            .join('\n')
                            .replace(/I ENTRTEVISTA CAS PROMOCI[ÓO]N \d{4}-\d{4}/gi, '')
                            .trim();
                          return stripped.slice(0, 350) + (stripped.length > 350 ? '…' : '');
                        })()}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={`/${locale}/interviews/${interview.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm hover:opacity-95 transition"
                      >
                        {locale === 'en' ? 'View interview' : 'Ver entrevista'}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/30 bg-primary/5 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{copy.noteLabel}: </span>
                {content.note}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
