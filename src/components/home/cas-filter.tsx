'use client';

import { Button } from '@/components/ui/button';
import type { CASBranch } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface CASFilterProps {
  activeFilter: CASBranch | 'all';
  onFilterChange: (filter: CASBranch | 'all') => void;
}

export function CASFilter({ activeFilter, onFilterChange }: CASFilterProps) {
  const t = useTranslations('cas');

  const filters: Array<{ value: CASBranch | 'all'; label: string; color: string }> = [
    { value: 'all', label: t('all'), color: 'default' },
    { value: 'C', label: t('creativity'), color: 'purple' },
    { value: 'A', label: t('activity'), color: 'green' },
    { value: 'S', label: t('service'), color: 'blue' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.value)}
          className={
            activeFilter === filter.value
              ? filter.color === 'purple'
                ? 'bg-purple-600 hover:bg-purple-700'
                : filter.color === 'green'
                ? 'bg-green-600 hover:bg-green-700'
                : filter.color === 'blue'
                ? 'bg-blue-600 hover:bg-blue-700'
                : ''
              : ''
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
