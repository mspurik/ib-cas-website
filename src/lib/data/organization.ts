import type { OrganizationEntry, Locale } from '../types';
import { getAllExperiences } from './experiences';
// import { getAllProjects } from './projects'; // Will add when projects are implemented
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function mapBranch(text: string) {
  const t = text.toLowerCase();
  const branches: string[] = [];
  if (t.includes('creativ')) branches.push('C');
  if (t.includes('activ') || t.includes('actividad')) branches.push('A');
  if (t.includes('servic') || t.includes('servic')) branches.push('S');
  return branches as any;
}

/**
 * Get all organization entries (experiences and projects combined)
 */
export async function getOrganizationEntries(locale: Locale): Promise<OrganizationEntry[]> {
  const experiences = await getAllExperiences(locale);

  // Convert experiences to organization entries
  const experienceEntries: OrganizationEntry[] = experiences.map(exp => ({
    id: exp.id,
    slug: exp.slug,
    title: exp.title,
    type: 'experience' as const,
    branches: exp.branches,
    learningOutcomes: exp.learningOutcomes,
    hours: exp.hours ?? null,
    startDate: exp.date,
    endDate: exp.date, // For punctual experiences, start and end are the same
    status: exp.date && new Date(exp.date) <= new Date() ? 'completed' : 'planned'
  }));

  // TODO: Add projects when implemented
  // const projects = await getAllProjects(locale);
  // const projectEntries: OrganizationEntry[] = projects.map(...);

  // Combine and sort by date (newest first)
  const allEntries = [...experienceEntries];

  // Try to read projects (optional) from src/content/projects/{locale} if present
  try {
    const projectsPath = join(process.cwd(), 'src/content/projects', locale);
    if (existsSync(projectsPath)) {
      const files = readdirSync(projectsPath).filter((f) => f.endsWith('.json'));
      for (const f of files) {
        try {
          const content = readFileSync(join(projectsPath, f), 'utf8');
          const proj = JSON.parse(content);
          allEntries.push({
            id: proj.id || `project-${proj.slug}`,
            slug: proj.slug,
            title: proj.title || proj.slug,
            type: 'project',
            branches: proj.branches || ['C'],
            learningOutcomes: proj.learningOutcomes || [],
            hours: proj.hours ?? null,
            startDate: proj.date || null,
            endDate: proj.endDate || proj.date || null,
            status: proj.date && new Date(proj.date) <= new Date() ? 'completed' : 'planned',
          } as OrganizationEntry);
        } catch (e) {
          // ignore invalid project files
        }
      }
    }
  } catch (e) {
    // ignore project read errors
  }

  // Try to read an imported markdown table with extra entries
  try {
    const mdPath = join(process.cwd(), 'src/content/organization/imported-full-1.md');
    if (existsSync(mdPath)) {
      const md = readFileSync(mdPath, 'utf8');
      // find table rows (lines with pipes) after header
      const lines = md.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      // find the header separator line (---|---)
      const sepIndex = lines.findIndex((l) => /^[-\s|:]+$/.test(l.replace(/\|/g, '')));
      if (sepIndex > -1) {
        const header = lines[0].split('|').map(h => h.trim());
        const rows = lines.slice(sepIndex + 1).filter(l => l.includes('|'));
        for (const row of rows) {
          const cols = row.split('|').map(c => c.trim());
          if (cols.length < 1) continue;
          const title = cols[0] || 'Imported activity';
          const description = cols[1] || '';
          const branchText = cols[2] || '';
          const hoursText = cols[3] || '';
          const loText = cols[4] || '';
          const doneText = cols[6] || '';
          const whenText = cols[7] || '';

          const branches = mapBranch(branchText) as any;
          let hours: number | null = null;
          const num = parseInt(hoursText.replace(/[^0-9-]/g, ''), 10);
          if (!Number.isNaN(num)) hours = num;

          const status = /si|yes/i.test(doneText) ? 'completed' : 'planned';

          // attempt to parse a year from whenText
          let startDate: string | undefined = undefined;
          const yearMatch = whenText.match(/(20\d{2})/);
          if (yearMatch) startDate = `${yearMatch[1]}-01-01`;

          const slug = slugify(title);

          allEntries.push({
            id: `import-${slug}`,
            slug,
            title,
            type: 'experience',
            branches: branches.length ? branches : ['C'],
            learningOutcomes: [],
            hours,
            startDate,
            endDate: startDate,
            status: status as any,
          });
        }
      }
    }
  } catch (e) {
    // ignore import errors
  }

  // Only include entries that actually have content files (experiences or projects)
  const projectSlugs = new Set<string>();
  try {
    const projectsPath = join(process.cwd(), 'src/content/projects', locale);
    if (existsSync(projectsPath)) {
      const files = readdirSync(projectsPath).filter((f) => f.endsWith('.json'));
      for (const f of files) {
        try {
          const content = readFileSync(join(projectsPath, f), 'utf8');
          const proj = JSON.parse(content);
          if (proj.slug) projectSlugs.add(proj.slug);
        } catch {}
      }
    }
  } catch {}

  const existingSlugs = new Set(experiences.map((e) => e.slug));
  for (const s of projectSlugs) existingSlugs.add(s);

  const filtered = allEntries.filter((entry) => existingSlugs.has(entry.slug));

  return filtered.sort((a, b) => {
    if (a.startDate && b.startDate) {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
    return 0;
  });
}
