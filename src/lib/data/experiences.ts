import type { CASExperience, CASBranch, Locale } from '../types';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'src/content/experiences');

/**
 * Get all experiences for a specific locale
 */
export async function getAllExperiences(locale: Locale): Promise<CASExperience[]> {
  const localeDir = join(contentDirectory, locale);

  try {
    const files = readdirSync(localeDir);
    const experiences = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = join(localeDir, file);
        const fileContents = readFileSync(filePath, 'utf8');
        const experience = JSON.parse(fileContents) as CASExperience;
        return experience;
      })
      .sort((a, b) => {
        // Sort by date (newest first), then by title
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
      });

    return experiences;
  } catch (error) {
    console.error(`Error loading experiences for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get a single experience by slug
 */
export async function getExperienceBySlug(
  slug: string,
  locale: Locale
): Promise<CASExperience | null> {
  const experiences = await getAllExperiences(locale);
  return experiences.find(exp => exp.slug === slug) || null;
}

/**
 * Filter experiences by CAS branch
 */
export async function getExperiencesByBranch(
  branch: CASBranch,
  locale: Locale
): Promise<CASExperience[]> {
  const experiences = await getAllExperiences(locale);
  return experiences.filter(exp => exp.branches.includes(branch));
}

/**
 * Get featured experiences
 */
export async function getFeaturedExperiences(locale: Locale): Promise<CASExperience[]> {
  const experiences = await getAllExperiences(locale);
  return experiences.filter(exp => exp.featured);
}

/**
 * Get all experience slugs for static generation
 */
export async function getAllExperienceSlugs(): Promise<string[]> {
  try {
    const enDir = join(contentDirectory, 'en');
    const files = readdirSync(enDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error loading experience slugs:', error);
    return [];
  }
}
