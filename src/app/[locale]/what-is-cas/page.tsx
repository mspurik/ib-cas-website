import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

interface WhatIsCASContent {
  title: string;
  subtitle: string;
  introduction: string;
  sections: Array<{
    title: string;
    icon: string;
    color: string;
    description: string;
    examples: string[];
  }>;
  objectives: string[];
}

async function getContent(locale: Locale): Promise<WhatIsCASContent> {
  const filePath = join(process.cwd(), 'src/content/what-is-cas', `${locale}.json`);
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function WhatIsCASPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale as Locale);

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
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

        {/* Three Strands */}
        <div className="grid gap-6 md:grid-cols-3">
          {content.sections.map((section) => (
            <Card key={section.icon} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                  <span className={`text-3xl font-bold ${colorClasses[section.color]}`}>
                    {section.icon}
                  </span>
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription className="text-base">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <h4 className="mb-3 font-semibold">Examples:</h4>
                <ul className="space-y-2">
                  {section.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>CAS Objectives</CardTitle>
            <CardDescription>
              Through CAS, students aim to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.objectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 shrink-0">
                    {idx + 1}
                  </Badge>
                  <span className="text-sm leading-relaxed">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
