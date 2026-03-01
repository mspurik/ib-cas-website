'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { CASExperience } from '@/lib/types';
import { CAS_BRANCHES } from '@/lib/constants';
import { useTranslations, useLocale } from 'next-intl';

interface ExperienceHeaderProps {
  experience: CASExperience;
}

export function ExperienceHeader({ experience }: ExperienceHeaderProps) {
  const t = useTranslations();
  const locale = useLocale();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/experiences">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t('experienceDetails.back')}
        </Button>
      </Link>

      {/* Title and Branches */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {experience.branches.map((branch) => {
            const branchInfo = CAS_BRANCHES[branch];
            return (
              <Badge
                key={branch}
                variant="secondary"
                className={`${branchInfo.bgColor} ${branchInfo.textColor}`}
              >
                {t(`cas.${branchInfo.key}`)}
              </Badge>
            );
          })}
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {experience.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {experience.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(experience.date)}</span>
            </div>
          )}

          {experience.contactPerson && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                {experience.contactPerson.name}
                {experience.contactPerson.role &&
                  ` • ${experience.contactPerson.role}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
