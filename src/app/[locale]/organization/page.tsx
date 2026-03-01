import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';
import { getOrganizationEntries } from '@/lib/data/organization';
import { CAS_BRANCHES } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const entries = await getOrganizationEntries(locale as Locale);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'planned':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t('organization.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {locale === 'en'
              ? 'Overview of all CAS experiences and projects'
              : 'Resumen de todas las experiencias y proyectos CAS'}
          </p>
        </div>

        {/* Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'en' ? 'All Activities' : 'Todas las Actividades'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-semibold">
                      {locale === 'en' ? 'Title' : 'Título'}
                    </th>
                    <th className="pb-3 text-left font-semibold">
                      {t('organization.type')}
                    </th>
                    <th className="pb-3 text-left font-semibold">CAS</th>
                    <th className="pb-3 text-left font-semibold">
                      {t('organization.status')}
                    </th>
                    <th className="pb-3 text-left font-semibold">
                      {t('organization.startDate')}
                    </th>
                    <th className="pb-3 text-left font-semibold">LO</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b last:border-0">
                      <td className="py-4">
                        <span className="font-medium">{entry.title}</span>
                      </td>
                      <td className="py-4">
                        <Badge variant="outline">
                          {entry.type === 'experience'
                            ? locale === 'en'
                              ? 'Experience'
                              : 'Experiencia'
                            : locale === 'en'
                              ? 'Project'
                              : 'Proyecto'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-1">
                          {entry.branches.map((branch) => {
                            const branchInfo = CAS_BRANCHES[branch];
                            return (
                              <Badge
                                key={branch}
                                variant="secondary"
                                className={`${branchInfo.bgColor} ${branchInfo.textColor}`}
                              >
                                {branch}
                              </Badge>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge className={getStatusColor(entry.status)}>
                          {t(`organization.statuses.${entry.status}`)}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {formatDate(entry.startDate)}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {entry.learningOutcomes.map((lo) => (
                            <Badge key={lo} variant="outline" className="text-xs">
                              {lo}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="pt-6 space-y-3">
                    <div>
                      <h3 className="font-semibold">{entry.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {entry.type === 'experience'
                          ? locale === 'en'
                            ? 'Experience'
                            : 'Experiencia'
                          : locale === 'en'
                            ? 'Project'
                            : 'Proyecto'}
                      </Badge>
                      {entry.branches.map((branch) => {
                        const branchInfo = CAS_BRANCHES[branch];
                        return (
                          <Badge
                            key={branch}
                            variant="secondary"
                            className={`${branchInfo.bgColor} ${branchInfo.textColor}`}
                          >
                            {branch}
                          </Badge>
                        );
                      })}
                      <Badge className={getStatusColor(entry.status)}>
                        {t(`organization.statuses.${entry.status}`)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">
                        {t('organization.startDate')}:{' '}
                      </span>
                      {formatDate(entry.startDate)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-medium mr-2">LO:</span>
                      {entry.learningOutcomes.map((lo) => (
                        <Badge key={lo} variant="outline" className="text-xs">
                          {lo}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {entries.length === 0 && (
              <div className="flex min-h-[200px] items-center justify-center">
                <p className="text-muted-foreground">
                  {locale === 'en'
                    ? 'No activities yet'
                    : 'No hay actividades todavía'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
