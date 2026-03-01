'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CASExperience } from '@/lib/types';
import { LEARNING_OUTCOMES } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

interface LearningOutcomesProps {
  experience: CASExperience;
}

export function LearningOutcomes({ experience }: LearningOutcomesProps) {
  const t = useTranslations('learningOutcomes');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {experience.learningOutcomes.map((lo) => {
            const outcome = LEARNING_OUTCOMES[lo];
            return (
              <div
                key={lo}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="mb-1">
                    {outcome.shortCode}
                  </Badge>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(outcome.key)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
