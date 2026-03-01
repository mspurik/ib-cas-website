import type { OrganizationEntry, Locale } from '../types';
import { getAllExperiences } from './experiences';
// import { getAllProjects } from './projects'; // Will add when projects are implemented

/**
 * Get all organization entries (experiences and projects combined)
 */
export async function getOrganizationEntries(locale: Locale): Promise<OrganizationEntry[]> {
  const experiences = await getAllExperiences(locale);

  // Convert experiences to organization entries
  const experienceEntries: OrganizationEntry[] = experiences.map(exp => ({
    id: exp.id,
    title: exp.title,
    type: 'experience' as const,
    branches: exp.branches,
    learningOutcomes: exp.learningOutcomes,
    startDate: exp.date,
    endDate: exp.date, // For punctual experiences, start and end are the same
    status: exp.date && new Date(exp.date) <= new Date() ? 'completed' : 'planned'
  }));

  // TODO: Add projects when implemented
  // const projects = await getAllProjects(locale);
  // const projectEntries: OrganizationEntry[] = projects.map(...);

  // Combine and sort by date (newest first)
  const allEntries = [...experienceEntries];

  return allEntries.sort((a, b) => {
    if (a.startDate && b.startDate) {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
    return 0;
  });
}
