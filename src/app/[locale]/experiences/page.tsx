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

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">CAS Experiences</h1>
      <ExperiencesGrid experiences={experiences} />
    </div>
  );
}
