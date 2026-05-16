import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';
import { getOrganizationEntries } from '@/lib/data/organization';
import { CAS_BRANCHES } from '@/lib/constants';
import { Link } from '@/lib/navigation';
import { getTranslations } from 'next-intl/server';

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const entries = await getOrganizationEntries(locale as Locale);
  // Add a placeholder project line to the register (shown at the bottom only)
  const entriesWithProject = [
    ...entries,
    {
      id: 'project-por-definir',
      title: locale === 'en' ? 'Project' : 'Proyecto',
      type: 'project' as const,
      branches: [] as any,
      learningOutcomes: [] as any,
      hours: null,
      startDate: undefined,
      endDate: undefined,
      status: 'planned' as const,
    },
  ];
  const knownHours = entries.reduce((total, entry) => total + (entry.hours ?? 0), 0);
  const totalHoursLabel = knownHours > 0 ? `${knownHours}` : locale === 'en' ? 'TBD' : 'Por definir';
  const coveredOutcomes = Array.from(
    new Set(entries.flatMap((entry) => entry.learningOutcomes))
  ).sort((a, b) => a - b);

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
    <div className="bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {locale === 'en' ? 'Organization of experiences' : 'Organización de experiencias'}
            </p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {t('organization.title')}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {locale === 'en'
                    ? 'A clean overview of my CAS experiences, outcomes, branches, and recorded hours.'
                    : 'Una visión clara de mis experiencias CAS, resultados, áreas y horas registradas.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-3 text-center">
                <div className="rounded-xl bg-background/80 px-3 py-4">
                  <p className="text-2xl font-bold">{entries.length}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === 'en' ? 'Experiences' : 'Experiencias'}
                  </p>
                </div>
                <div className="rounded-xl bg-background/80 px-3 py-4">
                  <p className="text-2xl font-bold">{totalHoursLabel}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === 'en' ? 'Hours' : 'Horas'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {coveredOutcomes.map((lo) => (
                <Badge key={lo} variant="secondary" className="rounded-full px-3 py-1">
                  LO{lo}
                </Badge>
              ))}
            </div>
          </div>
          {/* imported notes removed: data is now parsed into the organization table */}

          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'en' ? 'CAS Experiences Register' : 'Registro de Experiencias CAS'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left font-semibold">
                        {locale === 'en' ? 'Experience' : 'Experiencia'}
                      </th>
                      <th className="pb-3 text-left font-semibold">
                        {t('organization.type')}
                      </th>
                      <th className="pb-3 text-left font-semibold">
                        {locale === 'en' ? 'Hours' : 'Horas'}
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
                    {entriesWithProject.map((entry) => (
                      <tr key={entry.id} className="border-b last:border-0">
                        <td className="py-4">
                          {entry.slug ? (
                            <Link href={`/experiences/${entry.slug}`} className="font-medium text-primary hover:underline">
                              {entry.title}
                            </Link>
                          ) : (
                            <span className="font-medium">{entry.title}</span>
                          )}
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
                        <td className="py-4 text-sm text-muted-foreground">
                          {entry.hours ?? (locale === 'en' ? 'TBD' : 'Por determinar')}
                        </td>
                        <td className="py-4">
                          <div className="flex gap-1">
                            {entry.branches && entry.branches.length > 0 ? (
                              entry.branches.map((branch) => {
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
                              })
                            ) : (
                              <Badge variant="secondary">-</Badge>
                            )}
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

              <div className="space-y-4 md:hidden">
                {entriesWithProject.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="space-y-3 pt-6">
                      <div className="space-y-1">
                        {entry.slug ? (
                          <Link href={`/experiences/${entry.slug}`} className="font-semibold text-primary hover:underline">
                            {entry.title}
                          </Link>
                        ) : (
                          <h3 className="font-semibold">{entry.title}</h3>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {entry.hours ?? (locale === 'en' ? 'Hours TBD' : 'Horas por definir')}
                        </p>
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
                      ? 'No experiences yet'
                      : 'No hay experiencias todavía'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
