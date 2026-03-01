import { notFound } from 'next/navigation';
import { getExperienceBySlug, getAllExperienceSlugs } from '@/lib/data/experiences';
import type { Locale } from '@/lib/types';
import { ExperienceHeader } from '@/components/experience/experience-header';
import { ExperienceObjectives } from '@/components/experience/experience-objectives';
import { LearningOutcomes } from '@/components/experience/learning-outcomes';
import { CASStages } from '@/components/experience/cas-stages';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllExperienceSlugs();
  const locales: Locale[] = ['en', 'es'];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export default async function ExperiencePage({ params }: Props) {
  const { locale, slug } = await params;
  const experience = await getExperienceBySlug(slug, locale as Locale);

  if (!experience) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <ExperienceHeader experience={experience} />
        <ExperienceObjectives experience={experience} />
        <LearningOutcomes experience={experience} />
        <CASStages experience={experience} />
      </div>
    </div>
  );
}
