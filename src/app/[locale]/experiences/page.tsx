import { ExperiencesGrid } from '@/components/home/experiences-grid';
import { getAllExperiences } from '@/lib/data/experiences';
import type { Locale } from '@/lib/types';

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const experiences = await getAllExperiences(locale as Locale);
  const copy =
    locale === 'en'
      ? {
          eyebrow: 'CAS Portfolio',
          title: 'CAS Experiences',
          subtitle:
            'A structured collection of my creativity, activity, and service work, arranged to make the journey easier to follow.',
        }
      : {
          eyebrow: 'Portafolio CAS',
          title: 'Experiencias CAS',
          subtitle:
            'Una colección estructurada de mis trabajos de creatividad, actividad y servicio, organizada para seguir mejor el recorrido.',
        };

  return (
    <div className="bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container py-8 md:py-12">
        <div className="mb-8 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.subtitle}
          </p>
        </div>
        <ExperiencesGrid experiences={experiences} />
      </div>
    </div>
  );
}
