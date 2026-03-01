'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CASExperience } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface ExperienceObjectivesProps {
  experience: CASExperience;
}

export function ExperienceObjectives({ experience }: ExperienceObjectivesProps) {
  const t = useTranslations('experienceDetails');

  return (
    <div className="space-y-4">
      {/* Personal Objective */}
      <Card>
        <CardHeader>
          <CardTitle>{t('objective')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            {experience.personalObjective}
          </p>
        </CardContent>
      </Card>

      {/* Personal Challenge (if exists) */}
      {experience.personalChallenge && (
        <Card>
          <CardHeader>
            <CardTitle>{t('challenge')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {experience.personalChallenge}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
