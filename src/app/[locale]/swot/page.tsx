import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Locale, SWOT } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface SWOTContent {
  title: string;
  subtitle: string;
  introduction: string;
  swot: SWOT;
  reflection: string;
}

async function getContent(locale: Locale): Promise<SWOTContent> {
  const filePath = join(process.cwd(), 'src/content/swot', `${locale}.json`);
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function SWOTPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale as Locale);

  const swotSections = [
    {
      title: locale === 'en' ? 'Strengths' : 'Fortalezas',
      items: content.swot.strengths,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
    },
    {
      title: locale === 'en' ? 'Weaknesses' : 'Debilidades',
      items: content.swot.weaknesses,
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-300 dark:border-red-700',
    },
    {
      title: locale === 'en' ? 'Opportunities' : 'Oportunidades',
      items: content.swot.opportunities,
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
    },
    {
      title: locale === 'en' ? 'Threats' : 'Amenazas',
      items: content.swot.threats,
      icon: AlertTriangle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-300 dark:border-orange-700',
    },
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
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

        {/* SWOT Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {swotSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.title}
                className={`border-2 ${section.borderColor}`}
              >
                <CardHeader className={section.bgColor}>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${section.color}`} />
                    <CardTitle className={section.color}>
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${section.color.replace('text-', 'bg-')}`} />
                        <span className="leading-relaxed text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reflection */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle>
              {locale === 'en' ? 'Personal Reflection' : 'Reflexión Personal'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="leading-relaxed text-muted-foreground">
              {content.reflection}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
