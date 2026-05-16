import Link from 'next/link';
import type { Locale } from '@/lib/types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getMessages } from 'next-intl/server';

interface ExperienceMeta {
  slug: string;
  title: string;
  learningOutcomes: number[];
}

async function loadExperiences(locale: Locale): Promise<ExperienceMeta[]> {
  const dir = join(process.cwd(), 'src', 'content', 'experiences', locale);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }

  return files.map((file) => {
    const raw = readFileSync(join(dir, file), 'utf8');
    const data = JSON.parse(raw);
    return {
      slug: data.slug || file.replace(/\.json$/, ''),
      title: data.title || data.slug || file.replace(/\.json$/, ''),
      learningOutcomes: data.learningOutcomes || []
    } as ExperienceMeta;
  });
}

export default async function LearningOutcomesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeStr = locale as Locale;
  const messages = await getMessages();

  const experiences = await loadExperiences(localeStr);

  const loMap: Record<number, ExperienceMeta[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  };

  experiences.forEach((exp) => {
    (exp.learningOutcomes || []).forEach((lo: number) => {
      if (loMap[lo]) loMap[lo].push(exp);
    });
  });

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{messages.learningOutcomes?.title || 'Resultados de Aprendizaje'}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{messages.learningOutcomes?.intro || ''}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {([1,2,3,4,5,6,7] as number[]).map((lo) => (
            <article key={lo} className="group relative rounded-2xl border border-transparent hover:border-primary/20 transition-shadow bg-card/80 hover:shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">{lo}</div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight text-foreground">
                    {messages.learningOutcomes?.[`LO${lo}_title`]}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{messages.learningOutcomes?.[`LO${lo}_desc`]}</p>

                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">{loMap[lo].length} {messages.learningOutcomes?.experiencesCount || messages.common?.experiencesCount || 'experiences'}</div>
                  </div>

                  {loMap[lo].length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {loMap[lo].map((e) => (
                        <li key={e.slug} className="text-sm">
                          <Link href={`/${localeStr}/experiences/${e.slug}`} className="text-primary underline">{e.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
