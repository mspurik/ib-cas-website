'use client';

import { useState } from 'react';
import { ExperienceCard } from './experience-card';
import { CASFilter } from './cas-filter';
import type { CASExperience, CASBranch } from '@/lib/types';

interface ExperiencesGridProps {
  experiences: CASExperience[];
}

export function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
  const [activeFilter, setActiveFilter] = useState<CASBranch | 'all'>('all');

  const filteredExperiences =
    activeFilter === 'all'
      ? experiences
      : experiences.filter((exp) => exp.branches.includes(activeFilter));

  return (
    <section className="container py-12">
      <div className="space-y-8">
        {/* Filter */}
        <CASFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
            />
          ))}
        </div>

        {/* No results */}
        {filteredExperiences.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No experiences found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
