'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CASExperience } from '@/lib/types';
import { CAS_BRANCHES } from '@/lib/constants';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar } from 'lucide-react';

interface ExperienceCardProps {
  experience: CASExperience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const t = useTranslations('cas');
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
    <Link href={`/experiences/${experience.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {experience.coverImage ? (
            <Image
              src={experience.coverImage}
              alt={experience.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
              <span className="text-4xl font-bold text-white">
                {experience.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {experience.branches.map((branch) => {
              const branchInfo = CAS_BRANCHES[branch];
              return (
                <Badge
                  key={branch}
                  variant="secondary"
                  className={`${branchInfo.bgColor} ${branchInfo.textColor}`}
                >
                  {t(branchInfo.key)}
                </Badge>
              );
            })}
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold">
            {experience.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">
            {experience.personalObjective}
          </p>
        </CardContent>

        <CardFooter>
          {experience.date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(experience.date)}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
