import { HeroSection } from '@/components/home/hero-section';
import { ExperiencesGrid } from '@/components/home/experiences-grid';
import { getAllExperiences } from '@/lib/data/experiences';
import { getAboutContent } from '@/lib/data/about';
import type { Locale } from '@/lib/types';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const experiences = await getAllExperiences(locale as Locale);
  const about = await getAboutContent(locale as Locale);

  if (!about) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="flex flex-col">
      <HeroSection about={about} />
      <ExperiencesGrid experiences={experiences} />
    </div>
  );
}
