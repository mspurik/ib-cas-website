import type { Locale, Interview } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';
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

export default async function InterviewDetail({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const content = await getContent(locale as Locale);
  const interview = content.interviews.find((i) => i.id === id);

  if (!interview) {
    return (
      <div className="container py-12">
        <p>Interview not found</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href={`/${locale}/interviews`} className="text-sm text-primary hover:underline">← {locale === 'en' ? 'Back to interviews' : 'Volver a entrevistas'}</Link>
        <h1 className="text-3xl font-bold">{locale === 'en' ? `Interview ${interview.number}` : `Entrevista ${interview.number}`}</h1>
        <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
          <article className="prose max-w-none whitespace-pre-line">
            {(() => {
              const raw = interview.content || '';
              const cleaned = raw
                .split('\n')
                .filter((l) => !l.trim().startsWith('#'))
                .join('\n')
                .replace(/I ENTRTEVISTA CAS PROMOCI[ÓO]N \d{4}-\d{4}/gi, '')
                .trim();
              return cleaned;
            })()}
          </article>
        </div>
      </div>
    </div>
  );
}
