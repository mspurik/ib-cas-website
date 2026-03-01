import type { AboutContent, Locale } from '../types';
import { readFileSync } from 'fs';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'src/content/about');

/**
 * Get about content for a specific locale
 */
export async function getAboutContent(locale: Locale): Promise<AboutContent | null> {
  try {
    const filePath = join(contentDirectory, `${locale}.json`);
    const fileContents = readFileSync(filePath, 'utf8');
    const about = JSON.parse(fileContents) as AboutContent;
    return about;
  } catch (error) {
    console.error(`Error loading about content for locale ${locale}:`, error);
    return null;
  }
}
