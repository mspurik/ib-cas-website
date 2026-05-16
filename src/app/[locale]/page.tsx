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
      <div className="w-full py-8 mb-6" style={{ background: 'var(--brand-3)' }}>
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black">Carpeta CAS</h1>
          <p className="mt-3 text-lg text-muted-foreground">Explora tus experiencias CAS — creativas, activas y de servicio</p>
        </div>
      </div>

      <HeroSection about={about} locale={locale as Locale} />

      <section className="container py-12">
        <div className="rounded-xl p-6 shadow-md" style={{ background: 'linear-gradient(180deg, rgba(216,167,144,0.06), rgba(200,138,54,0.03))' }}>
          <ExperiencesGrid experiences={experiences} />
        </div>
      </section>
    </div>
  );
}
